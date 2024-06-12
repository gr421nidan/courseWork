// app/src/mixins/getTours.js
export const getTours = {
  data() {
    return {
      tours: [],
      message: "",
      showBlock: false,
    };
  },
  methods: {
    async getTours() {
      const url = "http://127.0.0.1:8000/api/tours";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        if (response.ok) {
          this.tours = await response.json();
        } else {
          throw new Error("Ошибка при получении данных");
        }
      } catch (error) {
        this.message = error.message;
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
      }
    },
  },
};
export const searchTours = {
  methods: {
    async searchTours(query) {
      const url = `http://127.0.0.1:8000/api/tours/search?query=${query}`;
      const response = await fetch(url, { method: "GET" });
      if (response.ok) {
        this.tours = await response.json();
      } else {
        this.message = "Ошибка при выполнении поиска";
      }
    },
  },
};
