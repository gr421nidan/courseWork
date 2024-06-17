<!--app/src/components/user/UserCabinet.vue-->
<template>
  <div class="container">
    <div class="content">
      <div class="cabinet">
        <h1>Личный кабинет</h1>
        <div class="cabinet_content">
          <div class="cabinet_head_content">
            <div>
              <a href="#" @click.prevent="setActiveSection('profile')" :class="{ active: activeSection === 'profile' }">Профиль</a>
              <a href="#" @click.prevent="setActiveSection('myTours')" :class="{ active: activeSection === 'myTours' }">Мои
                туры</a>
            </div>
            <span v-if="user.email_verified_at === null">
              <button @click="confirmEmail" class="btn_cabinet_email">
                Подтвердить почту
              </button>
            </span>
            <span v-else>
              <p>{{ user.email }}</p>
            </span>
          </div>
          <div class="line_element_cabinet"></div>
        </div>
        <section v-if="activeSection === 'profile'" class="profile">
          <div class="profile_block">
            <h3>Персональные данные</h3>
            <form class="form_profile" @submit.prevent="updateUserProfile">
              <div class="show-message" v-if="showBlock">
                {{ message }}
              </div>
              <div>
                <label>Фамилия</label>
                <input v-model="user.surname"/>
              </div>
              <div>
                <label>Имя</label>
                <input v-model="user.name"/>
              </div>
              <div>
                <label>Отчество</label>
                <span v-if="user.patronymic === '' || user.patronymic === null">
                  <input placeholder="Введите отчество" v-model="user.patronymic"/>
                </span>
                <span v-else>
                  <input v-model="user.patronymic"/>
                </span>
              </div>
              <button type="submit">Сохранить</button>
            </form>
          </div>
        </section>
        <section v-if="activeSection === 'myTours'" class="my_tours">
          <div class="show-message" v-if="showBlock">
            {{ message }}
          </div>
          <div class="my_tours_block">
            <h2>Мои забронированные туры</h2>
            <div v-if="applications.message">
              <p>{{ applications.message }}</p>
            </div>
            <div v-else class="my_application" v-for="application in applications" :key="application.application.id">
              <div class="my_application_text">
                <h3>{{ application.application.tour_name }}</h3>
                <p>
                  с {{ application.application.tour_date_start }} по
                  {{ application.application.tour_date_end }}
                </p>
                <p>Пожелания:</p>
                <p>{{ application.application.wishes }}</p>
                <p>
                  Количество взрослых:{{
                    application.application.count_adults
                  }}
                  Количество детей:{{ application.application.count_children }}
                </p>
                <p>{{ application.application.price_end }} <span>руб.</span></p>
                <p>{{ application.application.date_application }}</p>
              </div>
              <div class="my_application_info">
                <div>
                  <p>{{ application.application.status_application }}</p>
                  <div class="circle_application">
                    <p>?</p>
                    <div class="info_application">
                      <p v-if="application.application.response">
                        {{ application.application.response }} - {{ application.application.employee }}
                      </p>
                      <p v-else>
                        Вашу заявку рассмотрят в течении 1-2 дней, ожидайте. С
                        уважением агентство “Снежный Мир”
                      </p>
                    </div>
                  </div>
                </div>
                <button @click="deleteApplication(application.application.id)">
                  Отменить
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import {getUserProfile} from "/src/mixins/getUserProfile";
import {updateUserProfile} from "/src/mixins/updateUserProfile";
import {confirmEmail} from "@/mixins/confirmEmail";

export default {
  mixins: [getUserProfile, updateUserProfile, confirmEmail],
  data() {
    return {
      activeSection: "profile",
      user: {},
      applications: {},
      showBlock: false,
    };
  },
  mounted() {
    this.getUserProfile();
  },
  methods: {
    setActiveSection(section) {
      this.activeSection = section;
    },
    async getAboutMyApplication() {
      const token = this.$store.state.token;
      const url = "http://127.0.0.1:8000/api/booked/user";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (response.ok) {
          this.applications = await response.json();
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
    async deleteApplication(id) {
      const token = this.$store.state.token;
      const url = `http://127.0.0.1:8000/api/booked/delete/${id}`;
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
          await this.getAboutMyApplication();
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
  },
  created() {
    this.getAboutMyApplication();
  },
};
</script>
<style scoped></style>
