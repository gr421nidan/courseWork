// app/src/mixins/confirmEmail.js
export const confirmEmail = {
    data() {
        return {
            message: "",
            showBlock: false,
        };
    },
    methods: {
        async confirmEmail() {
            const token = this.$store.state.token;
            const url = "http://127.0.0.1:8000/api/email";
            await this.getUserProfile();
            const userEmail = this.user.email;
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                    body: JSON.stringify({email: userEmail}),
                });
                if (response.ok) {
                    this.message = "Сообщение с подтверждением было отправлено вам на почту";
                    this.showBlock = true;
                    setTimeout(() => {
                        this.showBlock = false;
                    }, 3000);
                } else {
                    throw new Error("Ошибка при отправке сообщения на подтверждение почты");
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
