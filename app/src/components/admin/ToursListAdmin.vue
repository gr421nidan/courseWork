<template>
  <div class="container">
    <div class="content-admin admin_page_content">
      <div class="admin_header_content">
        <div>
          <h1>Туры</h1>
        </div>
        <div class="line_element"></div>
      </div>
      <div class="tours_content">
        <div v-if="showBlock" class="show-message">
          {{ message }}
        </div>
        <div v-if="tours.length === 0">
          <p>Туры отсутствуют!</p>
        </div>
        <div class="list_tours">
          <li
            v-for="tour in tours"
            :key="tour.id"
            @click="inTour(tour.tour.id)"
          >
            {{ tour.tour.name }}
          </li>
        </div>
        <div class="tours_create_block">
          <form @submit.prevent="createTours" class="tours_create">
            <h2>Добавить тур</h2>
            <div class="form_tour">
              <input
                class="input_form"
                type="text"
                v-model="formData.name"
                placeholder="Название"
              />
              <textarea
                class="textarea_form"
                v-model="formData.description"
                placeholder="Описание"
              />
              <div class="input_form_small_row">
                <input
                  class="input_form_small"
                  type="text"
                  v-model="formData.price"
                  placeholder="Цена"
                />
                <input
                  class="input_form_small"
                  type="number"
                  v-model="formData.legal_age"
                  placeholder="Мин.возраст"
                />
              </div>
              <textarea
                class="textarea_form"
                v-model="formData.enabled"
                placeholder="Включено в тур"
              />
              <div class="input_form_small_row">
                <label class="custom-date-input">
                  Дата начала
                  <input
                    class="input_form_small"
                    type="date"
                    v-model="formData.date_start"
                  />
                </label>
                <label class="custom-date-input">
                  Дата окончания
                  <input
                    class="input_form_small"
                    type="date"
                    v-model="formData.date_end"
                  />
                </label>
              </div>
              <select v-model="formData.id_region" class="input_form">
                <option disabled value="">Добавить регион</option>
                <option
                  v-for="region in regions"
                  :key="region.id"
                  :value="region.id"
                >
                  {{ region.name }}
                </option>
              </select>
              <label for="file-upload" class="custom-file-upload">
                Добавить фото
                <input
                  id="file-upload"
                  class="input_file"
                  type="file"
                  @change="onFileChange"
                  multiple
                />
              </label>
            </div>
            <button class="button_admin_pages" type="submit">Добавить</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRegions } from "/src/mixins/getRegions";
import { getTours } from "/src/mixins/getTours";

export default {
  mixins: [getRegions, getTours],
  data() {
    return {
      formData: {
        name: "",
        legal_age: "",
        date_start: "",
        date_end: "",
        photo: null,
        price: "",
        description: "",
        enabled: "",
        id_region: "",
      },
      tours: [],
      regions: [],
      showBlock: false,
      verifiedEmail: false,
      error: "",
      message: "",
      user: {},
    };
  },
  created() {
    this.getRegions();
    this.getTours();
  },
  methods: {
    onFileChange(event) {
      this.formData.photo = event.target.files[0];
    },
    async createTours() {
      try {
        const formData = new FormData();
        formData.append("name", this.formData.name);
        formData.append("description", this.formData.description);
        formData.append("price", this.formData.price);
        formData.append("legal_age", this.formData.legal_age);
        formData.append("enabled", this.formData.enabled);
        formData.append("date_start", this.formData.date_start);
        formData.append("date_end", this.formData.date_end);
        formData.append("photo", this.formData.photo);
        formData.append("id_region", this.formData.id_region);

        const token = this.$store.state.token;
        const url = "http://127.0.0.1:8000/api/tour/create";
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
          await this.getTours();
          this.formData = {
            name: "",
            legal_age: "",
            date_start: "",
            date_end: "",
            photo: null,
            price: "",
            description: "",
            enabled: "",
            id_region: "",
          };
        } else {
          this.message = result.message;
          this.showBlock = true;
          setTimeout(() => {
            this.showBlock = false;
          }, 3000);
        }
      } catch (error) {
        this.message = "Серверная ошибка.";
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
      }
    },
    inTour(id) {
      this.$router.push({ name: "AboutTour", params: { id } });
    },
  },
};
</script>
