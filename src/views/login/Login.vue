<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      class="wrapper__img"
    />
    <div class="wrapper__input">
      <input class="wrapper__input__content" v-model="username" placeholder="请输入用户名" />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        v-model="password"
        placeholder="请输入密码"
        autocomplete="new-password"
      />
    </div>
    <div class="wrapper__login-button" @click="handelLogin">登录</div>
    <div class="wrapper__login-link" @click="handleRegister">立即注册</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../untils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handelLogin = async () => {
    try {
      const { username, password } = data
      if (username === '' || password === '') {
        return showToast('用户名或密码不能为空')
      }
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handelLogin }
}
const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegister }
}

export default {
  name: 'Login',
  components: { Toast },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handelLogin } = useLoginEffect(showToast)
    const { handleRegister } = useRegisterEffect()

    return { handelLogin, handleRegister, username, password, show, toastMessage }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    width: 0.66rem;
    height: 0.66rem;
    display: block;
    margin: 0 auto 0.4rem auto;
  }
  &__input {
    box-sizing: border-box;
    padding: 0 0.16rem;
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    background: #f9f9f9;
    border-radius: .06rem;
    border: .01rem solid $content-bgColor;
    &__content {
      border: none;
      outline: none;
      width: 100%;
      margin-top: .12rem;
      line-height: 0.22rem;
      background: none;
      font-size: 0.16rem;
      color: $content-fontcolor;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
  .wrapper__login-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    background: $button-color;
    line-height: 0.48rem;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    color: $bgColor;
    font-size: 0.16rem;
    text-align: center;
  }
  &__login-link {
    font-size: 0.14rem;
    color: $content-bgColor;
    text-align: center;
  }
}
</style>
