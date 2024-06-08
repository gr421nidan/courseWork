export const updateUserProfile = {
  data() {
    return {
      error: "",
      message: "",
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
        if (response.ok) {
          const result = await response.json();
          this.user = result.user;
          this.message = result.message;
          console.log(this.message);
          console.log(this.user);
        }
      } catch (error) {
        console.error("Ошибка при получении информации о пользователе:", error);
      }
    },
  },
};
