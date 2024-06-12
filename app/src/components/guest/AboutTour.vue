<!--app/src/components/guest/AboutTour.vue-->
<template>
  <div class="container">
    <div class="content">
      <section class="about_tour_content">
        <div>
          <div class="show-message" v-if="showBlock">
            {{ message }}
          </div>
          <router-link to="/tours">Вернуться назад</router-link>
          <div class="block_about_tour_content">
            <img alt="photo_tour" :src="tour.photo" />
            <div class="block_about_tour">
              <p>
                <strong>{{ statusTour }}</strong>
              </p>
              <h1>{{ tour.name }}</h1>
              <div class="block_about_tour_text">
                <p>{{ nameRegion }}</p>
                <p>с {{ tour.date_start }} по {{ tour.date_end }}</p>
                <p>Экскурсовод {{ nameGuide }}</p>
                <p>{{ tour.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="line_element"></div>
      </section>
      <section class="program_tour_content">
        <div class="blocks_about_tour_program">
          <div class="enabled_in_tour">
            <h3>{{ tour.price }} руб.</h3>
            <div class="enabled_in_tour_text">
              <div>
                <p>Что включено в тур:</p>
                <ul>
                  <li v-for="item in enabledItems" :key="item">
                    <span class="marker">•</span>{{ item }}
                  </li>
                </ul>
              </div>
            </div>
            <button @click="inBookingTour(tour.id)" class="program_btn">
              Забронировать
            </button>
            <div id="block_about_price">
              <p>Не требует оплаты сейчас</p>
              <div class="circle">
                <p>?</p>
                <div class="price_info">
                  <p>
                    После одобрения заявки с вами свяжется координатор тура по
                    звонку. Вы сможете задать все вопросы по туру, а затем
                    получить договор и счет.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="program_tour">
            <h1>Программа тура:</h1>
            <div v-if="programs.length === 0">
              <p>Программа тура пока не доступна.</p>
            </div>
            <div v-else>
              <div v-for="program in programs" :key="program.id">
                <p>{{ program.day }}</p>
                <div v-if="program.programme">
                  <div
                    v-for="programme in program.programme.split('\n')"
                    :key="programme"
                  >
                    <span class="marker">•</span>
                    {{ programme }}
                  </div>
                </div>
                <div v-else>
                  <p>Программа тура пока не доступна.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tour_info_block">
          <div class="info_tour_column_one">
            <h4>Проживание во время тура</h4>
            <p>{{ housing.name }}</p>
            <div id="address_block">
              <img src="../../assets/images/address_marker.png" />
              <span v-if="!housing.address"> Нет данных об отеле </span>
              <p>{{ housing.address }}</p>
            </div>
          </div>
          <div class="info_tour_column_two">
            <h4>Минимальный возраст</h4>
            <p>{{ tour.legal_age }} лет</p>
          </div>
          <div class="info_tour_column_three">
            <h4>Задайте вопрос координатору тура</h4>
            <h4>8-800-200-70-23</h4>
            <p>Бесплатно по России</p>
          </div>
        </div>
        <div class="line_element"></div>
      </section>
      <section class="hotel_content_tour">
        <h1>Отель {{ housing.name }}</h1>
        <div v-if="!housing.name">
          <p>Отель данному туру ещё не назначен.</p>
        </div>
        <div v-else class="hotel_info">
          <div class="hotel_info_text">
            <p>{{ housing.description }}</p>
            <div>
              <p>Адресс:</p>
              <p>
                {{ housing.address }}
              </p>
            </div>
          </div>
          <div class="hotel_photos">
            <span class="photos_hotel_content">
              <img
                v-if="housing.photo && housing.photo.length"
                :src="housing.photo[currentPhotoIndex]"
                alt="hotel_photo"
              />
              <p v-else>Фото недоступны</p>
            </span>
            <div
              class="arrows_row"
              v-if="housing.photo && housing.photo.length"
            >
              <img
                alt="arrow_left"
                src="../../assets/images/arrow_left.png"
                @click="backPhoto"
              />
              <img
                class="arrow_hotel_right"
                alt="arrow_right"
                src="../../assets/images/arrow_left.png"
                @click="nextPhoto"
              />
            </div>
          </div>
        </div>
        <div class="line_element"></div>
      </section>
      <section class="feedback_content">
        <div class="head_feedback_content">
          <h1>Отзывы о туре</h1>
          <button class="btn_feedback" @click="inFeedbackCreate(tour.id)">
            Оставить отзыв
          </button>
        </div>
        <div v-if="feedbacks.length === 0" class="no_reviews">
          <p>Пока нет отзывов о туре.</p>
        </div>
        <div
          v-else
          class="card_feedback"
          v-for="feedback in feedbacks"
          :key="feedback.id"
        >
          <div>
            <h3>{{ feedback.user_name }}</h3>
            <div class="rating_area_static">
              <label
                v-for="n in 5"
                :key="n"
                :class="{ filled: n <= feedback.rating }"
                >★</label
              >
            </div>
          </div>
          <p>{{ feedback.comment }}</p>
          <div class="photos_feedback">
            <img v-for="photo in feedback.photos" :src="photo" :key="photo" />
          </div>
          <p>{{ feedback.date }}</p>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { getAboutTour } from "@/mixins/getAboutTour";

export default {
  mixins: [getAboutTour],
  name: "aboutTour",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      guids: [],
      tour: {},
      statuses: [],
      error: "",
      message: "",
      nameRegion: "",
      nameGuide: "",
      housing: {
        photo: [],
      },
      feedbacks: [],
      programs: [],
      statusTour: "",
      currentPhotoIndex: 0,
      showBlock: false,
    };
  },
  created() {
    this.getAboutTour();
  },

  methods: {
    backPhoto() {
      if (this.currentPhotoIndex > 0) {
        this.currentPhotoIndex--;
      } else {
        this.currentPhotoIndex = this.housing.photo.length - 1;
      }
    },
    nextPhoto() {
      if (this.currentPhotoIndex < this.housing.photo.length - 1) {
        this.currentPhotoIndex++;
      } else {
        this.currentPhotoIndex = 0;
      }
    },
    inFeedbackCreate(id) {
      this.$router.push({ name: "feedbackCreate", params: { id } });
    },
    inBookingTour(id) {
      this.$router.push({ name: "bookingTour", params: { id } });
    },
  },
};
</script>
<style scoped></style>
