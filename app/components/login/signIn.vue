<template lang="html">
  <Form ref="singInForm" :model="formItem" :rules="formVaildate" :label-width="80">
    <FormItem label="用户名" prop="username">
      <Input type="text" v-model="formItem.username" placeholder="请输入">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem label="密码" prop="password">
      <Input type="password" v-model="formItem.password" placeholder="请输入">
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
        username: '',
        password: '',
      },
      formVaildate: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSignIn() {
      this.$refs.singInForm.validate(valid => {
          if (valid) {
            this.axios.post('/api/auth/sign_in', this.formItem, data => {
              console.log(data);
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
