<template>
  <h2>Login</h2>

  <template v-if="!auth.isAuth">
    <form @submit.prevent="login">
      <input
        v-model="user.email"
        type="text"
        placeholder="Seu email"
      >
      <input
        v-model="user.password"
        type="password"
        placeholder="Sua senha"
      >
      <button type="submit">
        Login
      </button>
    </form>
  </template>

  <template v-else>
    Logen id
  </template>
</template>

<script setup>
import http from '@/services/http.js';
import {reactive} from 'vue';
import {useAuth} from '@/stores/auth.js';

const auth = useAuth();

const user = reactive({
  email:'emilly94@ramos.com',
  password:'123'
})

async function login(){
  try {
    const {data} = await http.post('/auth',user);
    auth.setToken(data.token);
    auth.setUser(data.user);
    auth.setIsAuth(true);
  } catch (error) {
    console.log(error?.response?.data);
  }
}

</script>
