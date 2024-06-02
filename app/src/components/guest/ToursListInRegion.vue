<template>
  <div class="container">
    <div class="tours content">
      <div class="tours_content">
        <div class="tours_content_text">
          <h1>Туры</h1>
          <h4>Кемеровская область</h4>
        </div>
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
      <div class="grid_tours" v-for="tour in tours" :key="tour.id">
        <div class="card_tour">
          <img alt="photo_tour" :src="tour.image" />
          <div class="title_card">
            <h4>{{ tour.name }}</h4>
          </div>
          <div class="overlay_tours_card">
            <div class="card_about_tour">
              <h4>{{ tour.name }}</h4>
              <div class="line"></div>
              <p class="region">{{ tour.region }}</p>
            </div>
            <div class="about_tour">
              <p class="status">{{ tour.status }}</p>
              <p class="date">{{ tour.date_start }}</p>
              <p class="price">{{ tour.price }}<span>руб.</span></p>
            </div>
            <div class="btn_tour">
              <router-link class="link_btn" to="/tour/id"
                >Узнать больше</router-link
              >
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
  name: "ToursList",
  data() {
    return {
      tours: [],
      showBlock: false,
    };
  },
  created() {
    this.getTours();
  },
};
</script>
<style scoped></style>
