<template>
  <div>
    <form @submit.prevent="submitLogin">
      <input type="text" placeholder="login" v-model="email">
      <input type="text" placeholder="password" v-model="password">
      <button type="submit"></button>
    </form>
  </div>
</template>

<script>
import { login } from '@/api/auth.js';

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async submitLogin() {
      try {
        const data = await login(this.email, this.password);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>