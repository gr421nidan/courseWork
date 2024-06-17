<!--app/src/components/guest/UserRegistrations.vue-->
<template>
  <div class="background_image">
    <div class="registrations_block">
      <div class="form_registrations">
        <h1>Регистрация</h1>
        <form @submit.prevent="register" class="register">
          <div class="inputs_register">
            <input class="input_form" type="text" v-model="formData.surname" placeholder="Введите вашу фамилию"/>
            <input class="input_form" type="text" v-model="formData.name" placeholder="Введите ваше имя"/>
            <input class="input_form" type="text" v-model="formData.patronymic" placeholder="Введите вашe отчество"/>
            <input class="input_form" type="email" v-model="formData.email" placeholder="Введите вашу почту"/>
            <input class="input_form" type="password" v-model="formData.password" placeholder="Введите пароль"/>
          </div>
          <div class="confirmed_btn">
            <input type="checkbox" v-model="isCheckboxChecked"/>
            <span>Я соглашаюсь на передачу персональных данных согласно политике
              конфиденциальности и пользовательскому соглашению</span>
          </div>
          <div class="buttons_registrations">
            <button class="btn_register" type="submit">
              Зарегистрироваться
            </button>
            <p>Уже зарегистрированы?</p>
            <router-link to="/login">Войти</router-link>
            <router-link to="/">Вернуться назад</router-link>
          </div>
        </form>
      </div>
    </div>
    <div class="show-message" v-if="showBlock">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        surname: "",
        name: "",
        patronymic: "",
        email: "",
        password: "",
      },
      isCheckboxChecked: false,
      message: "",
      showBlock: "",
    };
  },
  methods: {
    async register() {
      if (!this.isCheckboxChecked) {
        this.message =
            "Вы должны согласиться с условиями политики конфиденциальности.";
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
        return;
      }
      const user = {
        surname: this.formData.surname,
        name: this.formData.name,
        email: this.formData.email,
        password: this.formData.password,
      };
      if (this.formData.patronymic) {
        user.patronymic = this.formData.patronymic;
      }
      const url = "http://127.0.0.1:8000/api/register";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(user),
        });
        if (response.ok) {
          this.$router.push("/login");
        } else {
          this.message = "Ошибка регистрации, проверьте поля данных!";
          this.showBlock = true;
        }
      } catch (error) {
        this.message = "Произошла ошибка при регистрации. Попробуйте позже.";
        this.showBlock = true;
      } finally {
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
        this.formData.surname = "";
        this.formData.name = "";
        this.formData.patronymic = "";
        this.formData.email = "";
        this.formData.password = "";
      }
    },
  },
};
</script>
