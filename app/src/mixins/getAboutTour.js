// app/src/mixins/getAboutTour.js
export const getAboutTour = {
    data() {
        return {
            tour: {},
            message: "",
            nameRegion: "",
            nameGuide: "",
            housing: {},
            programs: [],
            statusTour: "",
            feedbacks: [],
            showBlock: "",
        };
    },
    computed: {
        enabledItems() {
            return this.tour.enabled ? this.tour.enabled.split("\n") : [];
        },
    },
    methods: {
        async getAboutTour() {
            const token = this.$store.state.token;
            const url = `http://127.0.0.1:8000/api/tour/${this.id}`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                if (response.ok) {
                    const result = await response.json();
                    this.tour = result.tour;
                    this.nameRegion = result.region;
                    this.nameGuide = result.guide;
                    this.housing = result.housing;
                    this.programs = result.program;
                    this.statusTour = result.status;
                    this.feedbacks = result.feedback;
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
