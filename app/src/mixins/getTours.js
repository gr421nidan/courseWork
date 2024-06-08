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
        console.log(this.tours);
      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }
    },
  },
};
