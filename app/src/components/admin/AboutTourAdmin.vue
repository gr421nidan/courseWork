<!--app/src/components/admin/AboutTourAdmin.vue-->
<template>
  <div class="container">
    <div class="content-admin admin_page_content">
      <div class="admin_header_content">
        <div>
          <h1>Тур</h1>
        </div>
        <div class="line_element"></div>
      </div>
      <div class="tour_content">
        <div v-if="showBlock" class="show-message">
          {{ message }}
        </div>
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

              <li v-for="item in enabledItems" :key="item">
                <span class="marker">•</span>{{ item }}
              </li>
            </div>
            <div>
              <p>Место проживания:</p>
              <p v-if="housing.name">{{ housing.name }}</p>
              <p v-else>Отель не назначен</p>
              <p>Цена:</p>
              <p>{{ tour.price }}руб.</p>
              <p>Минимальный возраст:</p>
              <p>{{ tour.legal_age }} лет</p>
            </div>
          </div>
          <div class="program_tour_block">
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
        </div>
        <div class="tour_content_about">
          <button
            @click="deleteTour(tour.id)"
            type="submit"
            class="delete_button"
          >
            Удалить
          </button>
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
                      :value="status.id"
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
                      {{ guide.guide.name }} {{ guide.guide.surname }}
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
                    v-model="formData.day"
                    placeholder="Добавить название программы"
                  />
                  <textarea
                    class="textarea_form"
                    v-model="formData.programme"
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
        day: "",
        programme: "",
        id_status: "",
        id_guide: "",
        id_housing: "",
        legal_age: "",
        price: "",
      },
      showBlock: false,
      hotels: [],
      guids: [],
      tour: {},
      statuses: [],
      message: "",
      nameRegion: "",
      nameGuide: "",
      nameHotel: "",
      programTour: "",
      statusTour: "",
      user: {},
      programs: [],
    };
  },
  methods: {
    async getStatuses() {
      const token = this.$store.state.token;
      const url = "http://127.0.0.1:8000/api/status";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          this.statuses = await response.json();
        } else {
          throw new Error("Ошибка при получении данных");
        }
      } catch (error) {
        this.message = error.message;
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
      }
    },
    async updateTour() {
      const token = this.$store.state.token;
      const url = `http://127.0.0.1:8000/api/tour/update/${this.id}`;
      const requestData = Object.fromEntries(
          Object.entries(this.formData).filter(([_, value]) => value !== "")
      );
      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
        const result = await response.json();
        if (response.ok) {
          this.formData = {
            id_status: "",
            id_guide: "",
            price: "",
            id_housing: "",
            legal_age: "",
          };
          this.tour = result.tour;
          this.message = result.message;
          this.showBlock = true;
          await this.getAboutTour();
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        this.message = error.message;
        this.showBlock = true;
      } finally {
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
      }
    },
    async deleteTour(id) {
      const token = this.$store.state.token;
      const url = `http://127.0.0.1:8000/api/tour/delete/${id}`;
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          this.message = result.message;
          this.showBlock = true;
          setTimeout(() => {
            this.showBlock = false;
          }, 3000);
          await this.$router.push("/admin/tours");
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        this.message = error.message;
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
      }
    },
    async createProgram() {
      const token = this.$store.state.token;
      const url = `http://127.0.0.1:8000/api/program/create`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            day: this.formData.day,
            programme: this.formData.programme,
            id_tour: this.id,
          }),
        });
        const result = await response.json();
        if (response.ok) {
          await this.getAboutTour();
          this.formData.day = "";
          this.formData.programme = "";
          this.message = result.message;
          this.showBlock = true;
          setTimeout(() => {
            this.showBlock = false;
          }, 3000);
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        this.message = error.message;
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
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
