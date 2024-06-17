// app/src/mixins/getRegions.js
export const getRegions = {
    data() {
        return {
            regions: [],
            message: "",
            showBlock: false,
        };
    },
    methods: {
        async getRegions() {
            const url = "http://127.0.0.1:8000/api/region";
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                });
                if (response.ok) {
                    const result = await response.json();
                    this.regions = result.data;
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
