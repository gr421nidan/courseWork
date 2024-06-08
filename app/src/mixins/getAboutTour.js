export const getAboutTour = {
  data() {
    return {
      tour: {},
      error: "",
      message: "",
      nameRegion: "",
      nameGuide: "",
      nameHotel: "",
      programTour: "",
      statusTour: "",
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
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        this.tour = result.tour;
        this.nameRegion = result.region;
        this.nameGuide = result.guide;
        this.nameHotel = result.housing;
        this.programTour = result.program;
        this.statusTour = result.status;
        console.log(result);
      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }
    },
  },
};
