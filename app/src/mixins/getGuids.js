// app/src/mixins/getGuids.js
export const getGuids = {
  data() {
    return {
      guids: [],
      message: "",
      showBlock: false,
    };
  },

  methods: {
    async getGuids() {
      const url = "http://127.0.0.1:8000/api/guide";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        if (response.ok) {
          this.guids = await response.json();
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
