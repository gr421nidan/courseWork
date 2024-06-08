<template>
  <div class="container">
    <div class="content">
      <div class="cabinet">
        <h1>Личный кабинет</h1>
        <div class="cabinet_content">
          <div class="cabinet_head_content">
            <div>
              <a
                href="#"
                @click.prevent="setActiveSection('profile')"
                :class="{ active: activeSection === 'profile' }"
                >Профиль</a
              >
              <a
                href="#"
                @click.prevent="setActiveSection('myTours')"
                :class="{ active: activeSection === 'myTours' }"
                >Мои туры</a
              >
            </div>
            <span v-if="verifiedEmail">
              <button class="btn_cabinet_email">Подтвердить почту</button>
            </span>
            <span v-if="!verifiedEmail">
              <p>{{ user.email }}</p>
            </span>
          </div>
          <div class="line_element_cabinet"></div>
        </div>
        <section v-if="activeSection === 'profile'" class="profile">
          <div class="profile_block">
            <h3>Персональные данные</h3>
            <form class="form_profile" @submit.prevent="updateUserProfile">
              <div>
                <label>Фамилия</label>
                <input v-model="user.surname" />
              </div>
              <div>
                <label>Имя</label>
                <input v-model="user.name" />
              </div>
              <div>
                <label>Отчество</label>
                <span
                  v-if="user.patronymic === 'NULL' || user.patronymic === null"
                >
                  <input
                    placeholder="Введите отчество"
                    v-model="user.patronymic"
                  />
                </span>
                <span v-else>
                  <input v-model="user.patronymic" />
                </span>
              </div>
              <button type="submit">Сохранить</button>
            </form>
          </div>
        </section>
        <section v-if="activeSection === 'myTours'" class="my_tours">
          <div class="my_tours_block">
            <h2>Мои забронированные туры</h2>
            <div class="my_application">
              <div class="my_application_text">
                <h3>Просторы Шерегеша</h3>
                <p>18 - 24 декабря</p>
                <p>Пожелания:</p>
                <p>Поселить в комнату с односпальными кроватями.</p>
                <p>Количество человек:<span>2</span></p>
                <p>84 000 <span>руб.</span></p>
                <p>20.11.2023</p>
              </div>
              <div class="my_application_info">
                <div>
                  <p>На рассмотрении</p>
                  <div class="circle_application">?</div>
                </div>
                <span v-if="!applicationApproved">
                  <button>Отменить</button>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserProfile } from "/src/mixins/getUserProfile";
import { updateUserProfile } from "/src/mixins/updateUserProfile";
import { ref } from "vue";

export default {
  mixins: [getUserProfile, updateUserProfile],
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      activeSection: ref("profile"),
      user: {},
    };
  },
  mounted() {
    this.getUserProfile();
    this.updateUserProfile();
  },
  methods: {
    setActiveSection(section) {
      this.activeSection = section;
    },
  },
};
</script>
<style scoped></style>
