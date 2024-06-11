export const getUserProfile = {
  data() {
    return {
      error: "",
      message: "",
    };
  },
  methods: {
    async getUserProfile() {
      const userId = this.$store.state.userId;
      const token = this.$store.state.token;
      const url = `http://127.0.0.1:8000/api/user/${userId}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const result = await response.json();
          this.user = result[0];
        }
      } catch (error) {
        console.error("Ошибка при получении информации о пользователе:", error);
      }
    },
  },
};
