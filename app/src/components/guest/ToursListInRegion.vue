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
            <button class="filters">Фильтрация</button>
            <form action="" method="get" class="search_form">
              <input type="text" placeholder="Название" />
              <button type="submit">
                <img src="../../assets/images/icon_search.png" />
              </button>
            </form>
          </div>
        </div>
        <div class="grid_tours" v-for="tour in tours" :key="tour.id">
          <div class="card_tour">
            <img alt="photo_tour" :src="tour.photo" />
            <div class="title_card">
              <h4>{{ tour.name }}</h4>
            </div>
            <div class="overlay_tours_card">
              <div class="card_about_tour">
                <h4>{{ tour.name }}</h4>
                <div class="line"></div>
                <p class="region">{{ regionName }}</p>
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
  </div>
</template>
<script>
export default {
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
        this.regionName = result.data.name;
        this.tours = result.data.list;
      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }
    },
  },
  created() {
    this.getToursInRegion();
  },
};
</script>
<style scoped></style>
