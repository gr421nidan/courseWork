export const getRegions = {
  data() {
    return {
      regions: [],
      error: "",
    };
  },
  methods: {
    async getRegions() {
      const url = "http://127.0.0.1:8000/api/region";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        this.regions = result.data;
      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }
    },
  },
};
