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
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        v-model="ensurement"
        placeholder="请输入确认密码"
      />
    </div>
    <div class="wrapper__register-button" @click="handelRegister">注册</div>
    <div class="wrapper__register-link" @click="goLogin">已有帐号去登陆</div>
  </div>
  <Toast v-if="show" :message="toastMessage" />
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../untils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useregisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: '',
    ensurement: ''
  })
  const handelRegister = async () => {
    try {
      const { username, password, ensurement } = data
      if (username === '' || password === '' || ensurement === '') {
        return showToast('用户名或密码不能为空')
      }
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password,
        ensurement: data.ensurement
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Login' })
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handelRegister }
}
const useLoginEffect = () => {
  const router = useRouter()
  const goLogin = () => {
    router.push({ name: 'Login' })
  }
  return { goLogin }
}
export default {
  name: 'Register',
  components: {
    Toast
  },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, ensurement, handelRegister } = useregisterEffect(showToast)
    const { goLogin } = useLoginEffect()
    return { username, password, ensurement, handelRegister, show, toastMessage, goLogin }
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
      margin-top: .12rem;
      border: none;
      outline: none;
      width: 100%;
      line-height: 0.22rem;
      background: none;
      font-size: 0.16rem;
      color: $content-fontcolor;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
  &__register-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    background: $button-color;
    line-height: 0.48rem;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    color: $bgColor;
    font-size: 0.16rem;
    text-align: center;
  }
  &__register-link {
    font-size: 0.14rem;
    color: $content-bgColor;
    text-align: center;
  }
}
</style>
