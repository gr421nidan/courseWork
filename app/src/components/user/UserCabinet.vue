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
            <span v-if="!verifiedEmail">
              <button class="btn_cabinet_email">Подтвердить почту</button>
            </span>
            <span v-if="verifiedEmail">
              <p>myemail@email.com</p>
            </span>
          </div>
          <div class="line_element_cabinet"></div>
        </div>
        <section v-if="activeSection === 'profile'" class="profile">
          <div class="profile_block">
            <h3>Персональные данные</h3>
            <form class="form_profile">
              <div>
                <label>Фамилия</label>
                <input placeholder="Никушкина" />
              </div>
              <div>
                <label>Имя</label>
                <input placeholder="Дарья" />
              </div>
              <div>
                <label>Отчество</label>
                <input placeholder="Андреевна" />
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
<script setup>
import { ref } from "vue";

const activeSection = ref("profile");

function setActiveSection(section) {
  activeSection.value = section;
}
</script>
<style scoped></style>
