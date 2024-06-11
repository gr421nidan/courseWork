export const getTours = {
  data() {
    return {
      tours: [],
      error: "",
    };
  },
  methods: {
    async getTours() {
      const url = "http://127.0.0.1:8000/api/tours";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        this.tours = await response.json();
      } else {
        this.error = "Ошибка";
        console.error(this.error);
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
        console.error("Ошибка при выполнении поиска");
      }
    },
  },
};
