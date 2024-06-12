<!--app/src/components/guest/ToursList.vue-->
<template>
  <div class="container">
    <div class="content">
      <div class="tours">
        <div class="tours_content">
          <h1>Туры</h1>
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
        <div class="show-message" v-if="showBlock">
          {{ message }}
        </div>
        <div v-if="tours.length === 0">
          <p>Туры отсутствуют!</p>
        </div>
        <div class="grid_tours">
          <div class="card_tour" v-for="tour in tours" :key="tour.tour.id">
            <img alt="photo_tour" :src="tour.tour.photo" />
            <div class="title_card">
              <h4>{{ tour.tour.name }}</h4>
            </div>
            <div class="overlay_tours_card">
              <div class="card_about_tour">
                <h4>{{ tour.tour.name }}</h4>
                <div class="line"></div>
                <p class="region">{{ tour.region }}</p>
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
import { getTours, searchTours } from "/src/mixins/getTours";

export default {
  mixins: [getTours, searchTours],
  data() {
    return {
      tours: [],
      searchQuery: "",
      message: "",
      showBlock: false,
    };
  },
  methods: {
    inTour(id) {
      this.$router.push({ name: "aboutTour", params: { id } });
    },
    async submitSearch() {
      await this.searchTours(this.searchQuery);
    },
  },
  created() {
    this.getTours();
  },
};
</script>
<style scoped></style>
