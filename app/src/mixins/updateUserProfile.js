export const updateUserProfile = {
  data() {
    return {
      message: "",
      showBlock: false,
    };
  },
  methods: {
    async updateUserProfile() {
      const userId = this.$store.state.userId;
      const token = this.$store.state.token;
      const url = `http://127.0.0.1:8000/api/user/update/${userId}`;

      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.user),
        });

        const result = await response.json();

        if (response.ok) {
          this.user = result.user;
          this.message = "Профиль успешно обновлен";
          this.showBlock = true;
          setTimeout(() => {
            this.showBlock = false;
          }, 3000);
        } else {
          this.message = "Ошибка обновления профиля";
          this.showBlock = true;
          setTimeout(() => {
            this.showBlock = false;
          }, 3000);
        }
      } catch (error) {
        this.message =
          "Произошла ошибка при обновлении профиля. Попробуйте позже.";
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
      }
    },
  },
};
