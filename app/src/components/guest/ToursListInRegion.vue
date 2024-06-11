<template>
  <div class="container">
    <div class="content">
      <div class="tours">
        <div class="tours_content">
          <div class="tours_content_text">
            <h1>Туры</h1>
            <h4>{{ regionName }}</h4>
          </div>
          <div class="btns">
            <form
              @submit.prevent="submitSearch"
              action=""
              method="get"
              class="search_form"
            >
              <input v-model="searchQuery" type="text" placeholder="Название" />
              <button type="submit">
                <img src="../../assets/images/icon_search.png" />
              </button>
            </form>
          </div>
        </div>
        <div class="grid_tours">
          <div v-if="tours.length === 0">
            <p>В данном регионе пока отстустствуют туры.</p>
          </div>
          <div class="card_tour" v-for="tour in tours" :key="tour.tour.id">
            <img alt="photo_tour" :src="tour.tour.photo" />
            <div class="title_card">
              <h4>{{ tour.tour.name }}</h4>
            </div>
            <div class="overlay_tours_card">
              <div class="card_about_tour">
                <h4>{{ tour.tour.name }}</h4>
                <div class="line"></div>
                <p class="region">{{ regionName }}</p>
              </div>
              <div class="about_tour">
                <p class="status">{{ tour.status }}</p>
                <p class="date">{{ tour.tour.date_start }}</p>
                <p class="price">{{ tour.tour.price }}<span>руб.</span></p>
              </div>
              <button class="btn_tour" @click="inTour(tour.tour.id)">
                Узнать больше
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTours, searchTours } from "/src/mixins/getTours"; // подставьте путь к вашему миксину

export default {
  mixins: [getTours, searchTours],
  name: "ToursList",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      tours: [],
      showBlock: false,
      regionName: "",
      searchQuery: "",
    };
  },
  methods: {
    async getToursInRegion() {
      const url = `http://127.0.0.1:8000/api/region/${this.id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        this.regionName = result[0].region.name;
        this.tours = result.slice(1);
      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }
    },
    inTour(id) {
      this.$router.push({ name: "aboutTour", params: { id } });
    },
    async submitSearch() {
      await this.searchTours(this.searchQuery);
    },
  },

  created() {
    this.getToursInRegion();
  },
};
</script>
<style scoped></style>
