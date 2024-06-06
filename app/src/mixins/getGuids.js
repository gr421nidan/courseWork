export const getGuids = {
  data() {
    return {
      guids: [],
      error: "",
      message: "",
    };
  },

  methods: {
    async getGuids() {
      const url = "http://127.0.0.1:8000/api/guide";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        this.guids = await response.json();
      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }
    },
  },
};
