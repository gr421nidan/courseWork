// app/src/mixins/getUserProfile.js
export const getUserProfile = {
    data() {
        return {
            showBlock: false,
            message: "",
            user: {},
        };
    },
    methods: {
        async getUserProfile() {
            const token = this.$store.state.token;
            const url = `http://127.0.0.1:8000/api/user/me`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                if (response.ok) {
                    this.user = await response.json();
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
