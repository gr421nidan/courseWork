<template>
  <div class="container" v-if="!$store.getters.isAdmin">
    <section id="main">
      <img
        class="main_background"
        alt="main_background"
        src="../assets/images/main_background.png"
      />
      <div class="content">
        <div class="main_content">
          <div class="main_content_desc">
            <p>Туристическое агентство</p>
            <h1>
              Зимние курорты России:<br />ваш путь к<br />
              сказочным <br />приключениям!
            </h1>
            <p>
              Отправляйтесь в захватывающее путешествие по зимним курортам
              России с нашим туристическим агентством! Наполните свой отдых
              незабываемыми впечатлениями - бронируйте свой тур сейчас!
            </p>
          </div>
        </div>
      </div>
    </section>
    <section id="regions" class="content">
      <h1>Регионы</h1>
      <div class="grid_regions">
        <div class="card" v-for="region in regions" :key="region.id">
          <img alt="photo_region" :src="region.photo" />
          <div class="title_region">
            <h4>{{ region.name }}</h4>
          </div>
        </div>
      </div>
      <div class="line_element"></div>
    </section>
    <section class="guids content">
      <h1>Наши экскурсоводы</h1>
      <div class="grid_guids" v-for="guid in guids" :key="guid.id">
        <div class="card">
          <img alt="photo_guid" :src="getPhotoUrl(guid.photo)" />
          <div class="overlay">
            <div class="card_about">
              <h3>guid.name</h3>
              <div class="line"></div>
              <p>{{ guid.description }}</p>
              <p>{{ guid.region }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="line_element"></div>
    </section>
    <section id="about" class="about content">
      <div class="about_block">
        <h1>О нас</h1>
        <p>
          “Снежный мир” - команда профессионалов, с горячим сердцем и неугасимым
          энтузиазмом, которые стремятся создать для вас незабываемые зимние
          впечатления. В нашем агентстве мы специализируемся на организации
          туров по зимним курортам России, где каждый сможет найти что-то по
          своему вкусу и насладиться атмосферой сказочной зимы.
        </p>
      </div>
      <div class="why_us_block">
        <img
          class="background_about"
          src="../assets/images/background_about.png"
        />
        <div class="why_us_block_content">
          <h3>Почему выбирают нас:</h3>
          <div class="row_blocks_why_us">
            <div class="block_why_us">
              <p>Сотрудничество</p>
              <div class="line_why_us_block"></div>
              <p>
                Мы сотрудничаем только с проверенными партнерами и гарантируем
                качество услуг наших партнеров.
              </p>
            </div>
            <div class="block_why_us">
              <p>Профессионализм</p>
              <div class="line_why_us_block"></div>
              <p>
                Мы - команда профессионалов, которые знают и любят свою работу.
              </p>
            </div>
            <div class="block_why_us">
              <p>Цель</p>
              <div class="line_why_us_block"></div>
              <p>
                Cделать ваш отдых максимально комфортным, безопасным и запомина-
                ющимся.
              </p>
            </div>
            <div class="block_why_us">
              <p>Поддержка</p>
              <div class="line_why_us_block"></div>
              <p>
                Мы всегда готовы ответить на ваши вопросы и помочь в решении
                любых вопросов.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="line_element"></div>
    </section>
    <section id="contacts" class="contacts content">
      <h1>Контакты</h1>
      <div class="columns_contacts">
        <div class="column_contacts">
          <p>Связаться с нами:</p>
          <p>
            Бесплатный звонок:<br />
            Томск: +7 924 701-08-10<br />
            email: tour.montoj@tsk.ru
          </p>
        </div>
        <div class="column_contacts">
          <p>Наш адрес:</p>
          <p>
            ул. Гагарина 7,<br />
            Томск<br />
            2 этаж, 5 отдел
          </p>
        </div>
        <div class="column_contacts">
          <p>Режим работы:</p>
          <p>
            пн-сб: с 9:00<br />
            до 20:00<br />
            вс выходной
          </p>
        </div>
      </div>
      <div class="map_address"></div>
    </section>
  </div>
  <div class="container" v-if="$store.getters.isAdmin">
    <div class="content-admin admin_page_content">
      <div class="admin_header_content">
        <button type="submit">Выход</button>
        <div>
          <h1>Личный кабинет</h1>
          <span v-if="!verifiedEmail">
            <button type="submit">Подтвердить почту</button>
          </span>
          <span v-if="verifiedEmail">
            <p>myemail@email.com</p>
          </span>
        </div>
        <div class="line_element"></div>
      </div>
      <div class="profile_block">
        <h3>Персональные данные</h3>
        <form class="form_profile" v-if="user">
          <div>
            <label>Фамилия</label>
            <input placeholder="{{ user.surname }}" />
          </div>
          <div>
            <label>Имя</label>
            <input placeholder="{{ user.name }}" />
          </div>
          <div>
            <label>Отчество</label>
            <input placeholder="{{ user.patronymic }}" />
          </div>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { getRegions } from "/src/mixins/getRegions";
import { getGuids } from "/src/mixins/getGuids";
import { getUserProfile } from "/src/mixins/getUserProfile";
import { logout } from "/src/mixins/logout";

export default {
  mixins: [getRegions, getGuids, getUserProfile, logout],
  data() {
    return {
      regions: [],
      guids: [],
      error: "",
      message: "",
    };
  },
  methods: {
    getPhotoUrl(photo) {
      return `${process.env.VUE_APP_BASE_URL}/photos/${photo}`;
    },
  },
  created() {
    this.getRegions();
    this.getGuids();
    this.getUserProfile(user);
    this.logout();
  },
};
</script>
