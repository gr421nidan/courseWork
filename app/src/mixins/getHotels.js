export const getHotels = {
  data() {
    return {
      hotels: [],
      error: "",
      message: "",
    };
  },

  methods: {
    async getHotels() {
      const token = this.$store.state.token;
      const url = "http://127.0.0.1:8000/api/housing";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        this.hotels = result.data;
      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }
    },
  },
};
