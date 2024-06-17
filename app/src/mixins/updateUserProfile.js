// app/src/mixins/updateUserProfile.js
export const updateUserProfile = {
    data() {
        return {
            message: "",
            showBlock: false,
        };
    },
    methods: {
        async updateUserProfile() {
            const token = this.$store.state.token;
            const url = "http://127.0.0.1:8000/api/user/update/me";
            try {
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(this.user),
                });
                const result = await response.json();
                if (response.ok) {
                    this.user = result.user;
                    this.message = result.message;
                    this.showBlock = true;
                } else {
                    throw new Error(result.message || "Ошибка обновления профиля");
                }
            } catch (error) {
                this.message = error.message;
                this.showBlock = true;
            } finally {
                setTimeout(() => {
                    this.showBlock = false;
                }, 3000);
            }
        },
    },
};
