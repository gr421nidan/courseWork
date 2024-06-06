export const getUserProfile = {
  data() {
    return {
      error: "",
      users: [],
    };
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
  },
  methods: {
    async getUserProfile() {
      const token = this.$store.state.token;
      const url = `http://127.0.0.1:8000/api/user/${this.userId}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response:", response);
        this.users = await response.json();
      } catch (error) {
        console.error("Ошибка при получении информации о пользователе:", error);
      }
    },
  },
};
