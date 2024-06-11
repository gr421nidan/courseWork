<template>
  <div class="container">
    <div class="content-admin admin_page_content">
      <div class="admin_header_content">
        <div>
          <h1>Заявки</h1>
        </div>
        <div class="line_element"></div>
      </div>
      <div>
        <div class="list_booking_tours">
          <div v-if="applications.length === 0">
            <p>Заявки отсутствуют!</p>
          </div>
          <div v-else v-for="application in applications" :key="application.id">
            <div class="application_card_admin">
              <div>
                <div class="application_card_admin_text">
                  <p>
                    {{ application.user }} {{ application.surname }} -
                    {{ application.date_application }}
                  </p>
                  <h3>{{ application.tour }}</h3>
                  <p>
                    c {{ application.date_start }} по {{ application.date_end }}
                  </p>
                </div>
                <div class="application_card_admin_status">
                  {{ application.status_application }}
                  <button @click="confirmApplication(application.booked)">
                    Рассмотреть
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserProfile } from "/src/mixins/getUserProfile";
import { confirmEmail } from "@/mixins/confirmEmail";

export default {
  mixins: [getUserProfile, confirmEmail],
  data() {
    return {
      applications: [],
      user: {},
    };
  },
  methods: {
    async getUsersApplications() {
      const token = this.$store.state.token;
      const url = "http://127.0.0.1:8000/api/booked";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        this.applications = await response.json();
        console.log(this.applications);
      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }
    },
    confirmApplication(id) {
      this.$router.push({ name: "AboutApplication", params: { id } });
    },
  },
  created() {
    this.getUsersApplications();
    this.getUserProfile();
    this.confirmEmail();
  },
};
</script>
<style scoped></style>
