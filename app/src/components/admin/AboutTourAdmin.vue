<template>
  <div class="container">
    <div class="content-admin admin_page_content">
      <div class="admin_header_content">
        <div>
          <h1>Тур</h1>
          <span v-if="!verifiedEmail">
            <button type="submit">Подтвердить почту</button>
          </span>
          <span v-if="verifiedEmail">
            <p>myemail@email.com</p>
          </span>
        </div>
        <div class="line_element"></div>
      </div>
      <div class="tour_content">
        <div class="tour_content_about">
          <div class="card_tour_admin">
            <div class="card_tour_text">
              <p>
                <strong>{{ statusTour }}</strong>
              </p>
              <h3>{{ tour.name }}</h3>
            </div>
            <div class="card_about_tour_admin">
              <div class="card_about_tour_admin_text">
                <p>{{ nameRegion }}</p>
                <p>с {{ tour.date_start }} по {{ tour.date_end }}</p>
                <p>
                  <strong>{{ nameGuide }}</strong>
                </p>
                <p>{{ tour.description }}</p>
              </div>
              <div>
                <img :src="tour.photo" />
              </div>
            </div>
          </div>
          <div class="card_tour_admin_block">
            <div>
              <p>Что включено в тур:</p>
              <li v-for="item in enabledItems" :key="item">{{ item }}</li>
            </div>
            <div>
              <p>Место проживания:</p>
              <p>{{ nameHotel }}</p>
              <p>Цена:</p>
              <p>{{ tour.price }}руб.</p>
              <p>Минимальный возраст:</p>
              <p>{{ tour.legal_age }} лет</p>
            </div>
          </div>
          <div class="program_tour_block"></div>
        </div>
        <div class="tour_content_about">
          <button type="submit" class="delete_button">Удалить</button>
          <div class="tour_content_forms">
            <div class="tours_update_block">
              <form @submit.prevent="updateTour" class="guids_create">
                <h2>Редактировать тур</h2>
                <div>
                  <select v-model="formData.id_status" class="input_form">
                    <option disabled value="">Изменить статус</option>
                    <option
                      v-for="status in statuses"
                      :key="status.id"
                      :value="status.status"
                    >
                      {{ status.status }}
                    </option>
                  </select>
                  <select v-model="formData.id_guide" class="input_form">
                    <option disabled value="">Изменить экскурсовода</option>
                    <option
                      v-for="guide in guids"
                      :key="guide.guide.id"
                      :value="guide.guide.id"
                    >
                      {{ guide.guide.name }}{{ guide.guide.surname }}
                    </option>
                  </select>
                  <select v-model="formData.id_housing" class="input_form">
                    <option disabled value="">Изменить отель</option>
                    <option
                      v-for="hotel in hotels"
                      :key="hotel.id"
                      :value="hotel.id"
                    >
                      {{ hotel.name }}
                    </option>
                  </select>
                  <input
                    class="input_form"
                    type="number"
                    v-model="formData.legal_age"
                    placeholder="Мин.возраст"
                  />
                  <input
                    class="input_form"
                    type="text"
                    v-model="formData.price"
                    placeholder="Цена"
                  />
                </div>
                <button class="button_admin_pages" type="submit">
                  Сохранить
                </button>
              </form>
            </div>
            <div class="tour_program_block">
              <form @submit.prevent="createProgram" class="guids_create">
                <h2>Добавить программу тура</h2>
                <div>
                  <input
                    class="input_form"
                    type="text"
                    v-model="formData.name"
                    placeholder="Добавить название программы"
                  />
                  <textarea
                    class="textarea_form"
                    v-model="formData.description"
                    placeholder="Добавить программу"
                  />
                </div>

                <button class="button_admin_pages" type="submit">
                  Добавить
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAboutTour } from "@/mixins/getAboutTour";
import { getGuids } from "@/mixins/getGuids";
import { getHotels } from "@/mixins/getHotels";

export default {
  mixins: [getAboutTour, getGuids, getHotels],
  name: "AboutTour",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        description: "",
      },
      hotels: [],
      guids: [],
      tour: {},
      statuses: [],
      error: "",
      message: "",
      nameRegion: "",
      nameGuide: "",
      nameHotel: "",
      programTour: "",
      statusTour: "",
    };
  },
  methods: {
    async getStatuses() {
      const token = this.$store.state.token;
      const url = "http://127.0.0.1:8000/api/status";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        this.statuses = await response.json();
      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }
    },
    async updateTour() {
      const token = this.$store.state.token;
      const url = `http://127.0.0.1:8000/api/guide/update/${this.id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: this.formData.description,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        this.guide = result.guide;
        this.formData.description = "";
        console.log(result);
      } else {
        this.error = "Ошибка при обновлении гида";
        console.error(this.error);
      }
    },
  },
  created() {
    this.getAboutTour();
    this.getHotels();
    this.getGuids();
    this.getStatuses();
  },
};
</script>
