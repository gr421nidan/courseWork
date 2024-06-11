export const confirmEmail = {
  data() {
    return {
      message: "",
      showBlock: false,
    };
  },
  methods: {
    async confirmEmail() {
      const token = this.$store.state.token;
      const url = "http://127.0.0.1:8000/api/email";
      await this.getUserProfile();
      const userEmail = this.user.email;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        });
        if (response.ok) {
          this.message = "Подтверждение почты успешно отправлено";
          this.showBlock = true;
          setTimeout(() => {
            this.showBlock = false;
          }, 3000);
        } else {
          this.message = "Ошибка при отправке запроса на подтверждение почты";
          this.showBlock = true;
          setTimeout(() => {
            this.showBlock = false;
          }, 3000);
        }
      } catch (error) {
        this.message =
          "Произошла ошибка при отправке запроса на подтверждение почты";
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
      }
    },
  },
};
export const verificationEmail = {
  data() {
    return {
      message: "",
      showBlock: false,
    };
  },
  methods: {
    async verificationEmail(signature, expires) {
      const token = this.$store.state.token;
      const userId = this.$store.state.userId;
      const url = `http://127.0.0.1:8000/api/verify_email/${userId}/${signature}?expires=${expires}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          // Обработка успешного подтверждения почты
          console.log("Почта успешно подтверждена");
        } else {
          // Обработка ошибки подтверждения почты
          console.error("Ошибка при подтверждении почты");
        }
      } catch (error) {
        // Обработка других ошибок
        console.error(
          "Произошла ошибка при отправке запроса на подтверждение почты",
          error
        );
      }
    },
  },
};
