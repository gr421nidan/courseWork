<template>
  <div class="container">
    <div class="content">
      <div class="tours">
        <div class="tours_content">
          <h1>Туры</h1>
          <div class="btns">
            <button class="filters">Фильтрация</button>
            <form action="" method="get" class="search_form">
              <input type="text" placeholder="Название" />
              <button type="submit">
                <img src="../../assets/images/icon_search.png" />
              </button>
            </form>
          </div>
        </div>
        <div v-if="tours.length === 0">
          <p>Туры отсутствуют!</p>
        </div>
        <div class="grid_tours">
          <div class="card_tour" v-for="tour in tours" :key="tour.tour.id">
            <img alt="photo_tour" :src="tour.image" />
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
import { getTours } from "/src/mixins/getTours";
export default {
  mixins: [getTours],
  data() {
    return {
      tours: [],
      showBlock: false,
    };
  },
  methods: {
    inTour(id) {
      this.$router.push({ name: "aboutTour", params: { id } });
    },
  },
  created() {
    this.getTours();
  },
};
</script>
<style scoped></style>
