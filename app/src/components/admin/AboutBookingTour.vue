<!--app/src/components/admin/AboutBookingTour.vue-->
<template>
  <div class="container">
    <div class="content-admin admin_page_content">
      <div class="admin_header_content">
        <div>
          <h1>Заявки</h1>
        </div>
        <div class="line_element"></div>
      </div>
      <div class="booking_tours_content">
        <div v-if="showBlock" class="show-message">
          {{ message }}
        </div>
        <div class="card_application">
          <p>
            {{ details.user_name }} {{ details.user_surname }} -
            {{ details.date_application }}
          </p>
          <h3>{{ details.tour_name }}</h3>
          <p>c {{ details.tour_date_start }} по {{ details.tour_date_end }}</p>
          <p>Пожелания:</p>
          <p>{{ application.wishes }}</p>
          <p>
            Количество взрослых: {{ application.count_adults }} Количество
            детей: {{ application.count_children }}
          </p>
          <p>Общая цена: {{ application.price_end }} руб.</p>
          <div class="line_application"></div>
          <p>Для связи: {{ application.tel }}/{{ details.user_email }}</p>

          <div v-if="application.response != ''" class="response_block">
            <p>
              <strong>{{ details.status_application }}</strong>
            </p>
            {{ application.response }} {{ details.employees_name }}
          </div>
        </div>
        <div class="block_confirmApplication">
          <form @submit.prevent="confirmApplication">
            <h2>Рассмотреть заявку</h2>
            <div>
              <textarea
                class="textarea_form"
                v-model="formData.response"
                placeholder="Ответ"
              />
              <select
                v-model="formData.id_status_application"
                class="input_form"
              >
                <option disabled value="">Статус</option>
                <option
                  v-for="status in status_applications"
                  :key="status.id"
                  :value="status.id"
                >
                  {{ status.status }}
                </option>
              </select>
            </div>
            <button class="button_admin_pages" type="submit">Сохранить</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AboutApplication",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        id_status_application: "",
        response: "",
      },
      application: {},
      details: {},
      status_applications: [],
      message: "",
      showBlock: false,
    };
  },
  methods: {
    async getStatusesApplication() {
      const token = this.$store.state.token;
      const url = "http://127.0.0.1:8000/api/status/applications";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (response.ok) {
          this.status_applications = await response.json();
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
    async getAboutApplication() {
      const token = this.$store.state.token;
      const url = `http://127.0.0.1:8000/api/booked/${this.id}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const result = await response.json();
          this.details = result.details;
          this.application = result.booked;
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
    async confirmApplication() {
      const token = this.$store.state.token;
      const url = `http://127.0.0.1:8000/api/booked/update/${this.id}`;
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.formData),
        });
        const result = await response.json();
        if (response.ok) {
          this.message = result.message;
          this.showBlock = true;
          this.formData={};
          setTimeout(() => {
            this.showBlock = false;
          }, 3000);
          await this.getAboutApplication();
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
    this.getAboutApplication();
    this.getStatusesApplication();
  },
};
</script>
