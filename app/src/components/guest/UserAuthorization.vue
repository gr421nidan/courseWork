<template>
  <div class="background_image">
    <div class="login_block">
      <div class="form_login">
        <h1>Вход</h1>
        <form @submit.prevent="login">
          <div class="inputs_login">
            <input
              class="input_form"
              type="email"
              v-model="formData.email"
              placeholder="Введите вашу эл.почту"
            />
            <input
              class="input_form"
              type="password"
              v-model="formData.password"
              placeholder="Введите пароль"
            />
          </div>

          <div class="buttons">
            <button class="btn_auth_related" type="submit">Войти</button>
            <p>Впервые у нас?</p>
            <router-link to="/register">Зарегистрироваться</router-link>
            <router-link to="/reset-password">Сброс пароля</router-link>
            <router-link to="/">Вернуться назад</router-link>
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
        password: "",
      },
      message: "",
      showBlock: false,
      errors: {},
    };
  },
  methods: {
    async login() {
      const user = {
        email: this.formData.email,
        password: this.formData.password,
      };
      const url = "http://127.0.0.1:8000/api/login";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(user),
        });

        const result = await response.json();

        if (response.ok) {
          localStorage.setItem("token", result.access_token);
          localStorage.setItem("role", JSON.stringify(result.id_role));
          localStorage.setItem("userId", result.user.id);

          this.$store.dispatch("login", {
            token: result.access_token,
            role: result.id_role,
            userId: result.user.id,
          });
          this.$router.push("/");
          window.location.reload();
        } else {
          this.message = "Ошибка авторизации, проверьте поля ввода!";
          this.showBlock = true;
          setTimeout(() => {
            this.showBlock = false;
          }, 3000);
        }
      } catch (error) {
        this.message = "Произошла ошибка при авторизации. Попробуйте позже.";
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
      } finally {
        this.formData.email = "";
        this.formData.password = "";
      }
    },
  },
};
</script>
