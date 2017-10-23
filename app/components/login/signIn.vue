<template lang="html">
  <Form ref="singInForm" :model="formItem" :rules="formVaildate" :label-width="80">
    <FormItem label="用户名" prop="nick">
      <Input type="text" v-model="formItem.nick" placeholder="请输入">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem label="密码" prop="password">
      <Input type="password" v-model="formItem.password" placeholder="请输入" @keyup.enter.native="handleSignIn">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem class="action">
        <Button type="primary" @click="handleSignIn">登录</Button>
        <Button @click="toSignUp">注册</Button>
    </FormItem>
  </Form>
</template>

<script>
export default {
  name: 'singIn',
  data() {
    return {
      formItem: {
        nick: '',
        password: '',
      },
      formVaildate: {
        nick: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

  },
  methods: {
    handleSignIn() {
      this.$refs.singInForm.validate(valid => {
          if (valid) {
            this.axios.post('/api/auth/sign_in', this.formItem)
              .then(res => {
                if (!res) return;
                window.localStorage.setItem('token', res.token);
                this.axios.updateToken();
                // this.axios.default.headers.common['X-Access-Token'] = res.token;
                // console.log(this.axios.default.headers);

                this.$store.dispatch('getCategories', { user_id: res.data.user_id })
                  .then(hasCategories => {
                    if (hasCategories) {
                      this.$router.push({name: 'guide'});
                    } else {
                      this.$router.push({name: 'dashboard'});
                    }
                  })
              })
          }
        }
      )
    },
    toSignUp() {
      this.$emit('cut');
    }
  }
}
</script>

<style lang="scss">

</style>
