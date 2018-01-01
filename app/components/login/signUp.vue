<template lang="html">
  <Form ref="signUpForm" :rules="fromValidate" :model="formItem" :label-width="80">
    <FormItem label="用户名" prop="nick">
      <Input type="text" v-model="formItem.nick" placeholder="请输入">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem label="密码" prop="password">
      <Input type="password" v-model="formItem.password" placeholder="请输入">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem label="确认密码" prop="confirmPassword">
      <Input type="password" v-model="confirmPassword" placeholder="请输入">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem class="action">
        <Button type="primary" @click="handleSignUp">注册</Button>
        <Button @click="toSignUp">返回登陆</Button>
    </FormItem>
  </Form>
</template>

<script>
export default {
  name: 'siginUp',
  data() {
    const validateUsername = (rule, val, cb) => {
      const patrn = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{1,32}$/g
      if (val === '') {
        return cb(new Error('用户名不能为空'));
      }
      if (val.length > 32) {
        return cb(new Error('最长不能超过32个字符'));
      }
      if (!patrn.test(val)) {
        return cb(new Error('只支持汉字、字母、数字、下划线'));
      }
      cb();
    }
    const checkHasName = (rule, val, cb) => {
      this.axios.post('/api/auth/check_name', {nick: this.formItem.nick}, true)
      .then(res => {
        if (!res.data) return cb(new Error(res.message));
        return cb();
      })
    }
    const validatePassword = (rule, val, cb) => {
      if (val === '') {
        return cb(new Error('请输入密码'));
      }
      if (val.length < 6) {
        return cb(new Error('密码至少6位数'));
      }
      cb();
    }
    const validateConfirmPassword = (rule, val, cb) => {
      console.log(val, this.formItem.password);
      if (this.confirmPassword !== this.formItem.password) return cb(new Error('两次密码输入不一致'));
      cb();
    }
    return {
      formItem: {
        nick: '',
        password: '',
      },
      fromValidate: {
        nick: [
          { validator: validateUsername, trigger: 'blur' },
          { validator: checkHasName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      },
      confirmPassword: '',
    }
  },
  methods: {
    handleSignUp() {
      this.$refs.signUpForm.validate(valid => {
        if (valid) {
          this.axios.post('/api/auth/sign_up', this.formItem)
          .then(res => {
            if (res.data) {
              this.$router.push({name: 'guide'});
            }
          })
        }
      })
    },
    toSignUp() {
      this.$emit('cut');
    }
  }
}
</script>

<style lang="scss">
</style>
