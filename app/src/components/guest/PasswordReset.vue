<template>
  <div class="background_image">
    <div class="password_reset_block">
      <div class="password_reset">
        <h1>Сброс пароля</h1>
        <form @submit.prevent="passwordReset">
          <input
            class="input_form"
            type="email"
            v-model="formData.email"
            placeholder="Введите вашу эл.почту"
          />
          <div class="buttons">
            <button class="btn_auth_related" type="submit">Отправить</button>
            <router-link to="/login">Назад</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      error: "",
      message: "",
      showBlock: false,
    };
  },
  methods: {
    async passwordReset() {
      const user = {
        email: this.formData.email,
      };
      const url = "http://127.0.0.1:8000/api/reset-password";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      if (response.ok) {
        this.message = result.message;
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
      } else {
        this.formData.email = "";
        this.error = response.error;
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
