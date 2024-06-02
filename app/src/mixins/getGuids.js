export const getGuids = {
  data() {
    return {
      guids: [],
      regions: [],
      showBlock: false,
      verifiedEmail: false,
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
          Accept: "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        this.guids = result.data;
      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }
    },
  },
};
