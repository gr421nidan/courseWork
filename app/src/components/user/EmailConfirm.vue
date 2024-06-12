<!--app/src/components/user/EmailConfirm.vue-->
<template>
  <div class="confirm">
    <div class="confirm_email">Ваша почта была подтверждена!</div>
    <router-link to="/login">Авторизуйтесь для дальнейшей работы</router-link>
  </div>
</template>
<style>
.confirm {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  gap: 15px;
}
.confirm a {
  text-decoration: underline;
  font-size: 18px;
}
.confirm_email {
  border-radius: 60px;
  background-color: #aacae7;
  width: 500px;
  height: 100px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-family: "Comfortaa", sans-serif;
}
</style>
