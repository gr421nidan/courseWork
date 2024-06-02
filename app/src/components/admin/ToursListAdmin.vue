<template>
  <div class="container">
    <div class="content-admin admin_page_content">
      <div class="admin_header_content">
        <button type="submit">Выход</button>
        <div>
          <h1>Туры</h1>
          <span v-if="!verifiedEmail">
            <button type="submit">Подтвердить почту</button>
          </span>
          <span v-if="verifiedEmail">
            <p>myemail@email.com</p>
          </span>
        </div>
        <div class="line_element"></div>
      </div>
      <div class="tours_content">
        <div class="list_tours">
          <div v-if="tours.length === 0">
            <p>Туры отсутствуют!</p>
          </div>
          <ul>
            <li v-for="tour in tours" :key="tour.id">
              {{ tour.name }}
            </li>
          </ul>
        </div>
        <div class="tours_create_block">
          <form @submit.prevent="createTours" class="tours_create">
            <h2>Добавить тур</h2>
            <div>
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
              <div>
                <input
                  class="input_form_small"
                  type="text"
                  v-model="formData.price"
                  placeholder="Цена"
                />
                <input
                  class="input_form_small"
                  type="date"
                  v-model="formData.legal_age"
                  placeholder="Мин.возраст"
                />
              </div>
              <textarea
                class="textarea_form"
                v-model="formData.enabled"
                placeholder="Включено в тур"
              />
              <div>
                <input
                  class="input_form_small"
                  type="date"
                  v-model="formData.date_start"
                  placeholder="Дата начала"
                />
                <input
                  class="input_form_small"
                  type="date"
                  v-model="formData.date_end"
                  placeholder="Дата окончания"
                />
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
              <input
                class="input_form"
                type="file"
                @change="onFileChange"
                placeholder="Добавить фото"
              />
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
        photo: "",
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
      const tour = {
        name: this.formData.name,
        description: this.formData.description,
        price: this.formData.price,
        legal_age: this.formData.legal_age,
        date_start: this.formData.date_start,
        date_end: this.formData.date_end,
        enabled: this.formData.enabled,
        photo: this.formData.photo,
        id_region: this.formData.id_region,
      };
      const url = "http://127.0.0.1:8000/api/guide/create";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tour),
      });
      const result = await response.json();
      if (response.ok) {
        this.message = result.message;
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
        console.error("Сообщение:", this.message);
      } else {
        this.formData.name = "";
        this.formData.enabled = "";
        this.formData.description = "";
        this.formData.price = "";
        this.formData.date_start = "";
        this.formData.date_end = "";
        this.formData.legal_age = "";
        this.formData.photo = "";
        this.formData.id_region = "";
        this.error = result.error;
        this.showBlock = true;

        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
        console.error("Ошибка:", this.error);
      }
    },
  },
};
</script>
