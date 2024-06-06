<template>
  <div class="password_recovery_block">
    <div class="password_recovery">
      <h1>Новый пароль</h1>
      <form @submit.prevent="passwordRecovery">
        <input
          class="input_form"
          type="password"
          v-model="password"
          placeholder="Введите новый пароль"
        />
        <input
          class="input_form"
          type="password"
          v-model="password_confirmation"
          placeholder="Повторите пароль"
        />

        <div class="buttons">
          <button class="btn_auth_related" type="submit">Сохранить</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: "",
      password_confirmation: "",
      error: "",
      showBlock: false,
    };
  },
  methods: {
    async passwordRecovery() {
      const url = "http://127.0.0.1:8000/api/password-recovery";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          password: this.password,
          password_confirmation: this.password_confirmation,
        }),
      });
      if (response.ok) {
        this.$router.push("/password-recovery");
      } else {
        this.error = "Неверные учетные данные";
        this.password = "";
        this.password_confirmation = "";
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
        console.error("Ошибка:", this.error);
      }
    },
  },
};
</script>
