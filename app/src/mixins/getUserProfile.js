export const getUserProfile = {
  data() {
    return {
      error: "",
      user: null,
    };
  },
  methods: {
    async getUserProfile(user) {
      const token = localStorage.getItem("access_token");
      const url = `http://127.0.0.1:8000/api/user/${user.id}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = await response.json();
      } catch (error) {
        console.error("Ошибка при получении информации о пользователе:", error);
      }
    },
  },
};
