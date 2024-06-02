export const logout = {
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      this.$router.push("/");
      window.location.reload();
    },
  },
};
