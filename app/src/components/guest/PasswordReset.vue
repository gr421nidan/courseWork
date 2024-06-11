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
      <div class="show-message" v-if="showBlock">
        {{ message }}
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
      },
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
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (response.ok) {
          this.message = "Проверьте свою электронную почту!";
        } else {
          this.message =
            "Ошибка сброса пароля, проверьте правильность введенных данных!";
        }
      } catch (error) {
        this.message = "Произошла ошибка при сбросе пароля. Попробуйте позже.";
      } finally {
        this.formData.email = "";
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
      }
    },
  },
};
</script>
