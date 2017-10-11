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
      }
    }
  },
  methods: {
    handleSignIn() {

    },
    toSignUp() {
      this.$emit('cut');
    }
  }
}
</script>

<style lang="scss">

</style>
