<template lang="html">
  <Form :model="formItem" :label-width="80">
    <FormItem label="用户名">
      <Input type="text" v-model="formItem.username" placeholder="请输入">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem label="密码">
      <Input type="password" v-model="formItem.password" placeholder="请输入">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem label="确认密码">
      <Input type="password" v-model="confirmPassword" placeholder="请输入">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem class="action">
        <Button type="primary" @click="handleSignUp">确认</Button>
        <Button @click="toSignUp">返回登陆</Button>
    </FormItem>
  </Form>
</template>

<script>
export default {
  name: 'siginUp',
  data() {
    return {
      formItem: {
        username: '',
        password: '',
      },
      confirmPassword: '',
    }
  },
  methods: {
    handleSignUp() {
      if (this.formItem.password !== this.confirmPassword) {
        this.$Message.error('两次密码输入不一致');
        return;
      }
      this.$http.post('/api/auth/sign_up', this.formItem, function (data) {
        console.log(data)
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
