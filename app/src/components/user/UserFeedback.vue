<!--app/src/components/user/UserFeedback.vue-->
<template>
  <div class="container">
    <div class="content">
      <div class="feedback_create_block">
        <router-link to="/tours">Вернуться назад</router-link>
        <div class="feedback_create_content">
          <h1>Написать отзыв</h1>
          <p>Отзыв о туре: {{ tour.name }}</p>
          <p class="warning_block">
            Во избежание накрутки отзыв можно оставить,<br />
            только если Вы до этого купили тур.
          </p>
          <div class="show-message" v-if="showBlock">
            {{ message }}
          </div>
          <form @submit.prevent="createFeedback">
            <div class="rating_feedback">
              <p>Рейтинг</p>
              <div class="rating_area">
                <input
                  type="radio"
                  id="star-5"
                  name="rating"
                  value="5"
                  @change="setRating"
                />
                <label for="star-5" title="Оценка «5»"></label>
                <input
                  type="radio"
                  id="star-4"
                  name="rating"
                  value="4"
                  @change="setRating"
                />
                <label for="star-4" title="Оценка «4»"></label>
                <input
                  type="radio"
                  id="star-3"
                  name="rating"
                  value="3"
                  @change="setRating"
                />
                <label for="star-3" title="Оценка «3»"></label>
                <input
                  type="radio"
                  id="star-2"
                  name="rating"
                  value="2"
                  @change="setRating"
                />
                <label for="star-2" title="Оценка «2»"></label>
                <input
                  type="radio"
                  id="star-1"
                  name="rating"
                  value="1"
                  @change="setRating"
                />
                <label for="star-1" title="Оценка «1»"></label>
              </div>
            </div>
            <div class="comment_feedback">
              <p>Текст отзыва</p>
              <textarea
                v-model="formData.comment"
                placeholder="Расскажите о ваших впечатлениях"
              ></textarea>
            </div>
            <label for="file-upload" class="custom-file-upload-feedback">
              Добавить фото к вашему отзыву
              <input
                id="file-upload"
                class="input_file"
                type="file"
                @change="onFileChange"
                multiple
              />
            </label>
            <p class="constraint">
              Можно добавить до 3 фотографий, размер загружаемого файла не
              должен превышать 5 мб. Допустимые форматы изображений - JPEG, PNG,
              JPG, WEBP
            </p>
            <button class="btn_create_feedback" type="submit">
              Отправить отзыв
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAboutTour } from "@/mixins/getAboutTour";

export default {
  mixins: [getAboutTour],
  name: "feedbackCreate",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        comment: "",
        photo: [],
        rating: null,
      },
      tour: {},
      showBlock: false,
      message: "",
    };
  },
  methods: {
    onFileChange(event) {
      this.formData.photo = Array.from(event.target.files);
    },
    setRating(event) {
      this.formData.rating = event.target.value;
    },
    async createFeedback() {
      if (!this.formData.photo.length) {
        this.message = "Пожалуйста, выберите фото.";
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
        return;
      }
      const formData = new FormData();
      formData.append("comment", this.formData.comment);
      formData.append("count_stars", this.formData.rating);
      this.formData.photo.forEach((file, index) => {
        formData.append(`photo[${index}]`, file);
      });
      const token = this.$store.state.token;
      const url = `http://127.0.0.1:8000/api/feedback/create/${this.id}`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        });
        const result = await response.json();
        if (response.ok) {
          this.message = result.message;
          this.showBlock = true;
          setTimeout(() => {
            this.showBlock = false;
          }, 3000);
          this.$router.push(`/tour/${this.id}`);
        } else {
          this.message = result.message;
          this.showBlock = true;
          setTimeout(() => {
            this.showBlock = false;
          }, 3000);
        }
      } catch (error) {
        this.message = "Произошла ошибка при отправке отзыва.";
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
      }
    },
  },
  created() {
    this.getAboutTour();
  },
};
</script>
