// app/src/mixins/getHotels.js
export const getHotels = {
    data() {
        return {
            hotels: [],
            showBlock: false,
            message: "",
        };
    },
    methods: {
        async getHotels() {
            const token = this.$store.state.token;
            const url = "http://127.0.0.1:8000/api/housing";
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const result = await response.json();
                    this.hotels = result.data;
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
