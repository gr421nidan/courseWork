<!--app/src/App.vue-->
<template>
  <div id="app" v-if="isAuthRelatedPage">
    <router-view></router-view>
  </div>
  <div v-if="!isAuthRelatedPage">
    <span v-if="$store.getters.isAdmin && $store.getters.isAuthenticated">
      <div class="admin_header">
        <nav class="nav_admin">
          <div class="nav_admin_logo">
            <img alt="logo" src="../src/assets/images/logo_nav.png" />
            <span class="logo_text">Снежный мир</span>
          </div>
          <router-link to="/" :class="{ active: $route.path === '/' }"
            >Личный кабинет</router-link
          >
          <router-link
            to="/admin/guids"
            :class="{ active: $route.path === '/admin/guids' }"
            >Экскурсоводы</router-link
          >
          <router-link
            to="/admin/regions"
            :class="{ active: $route.path === '/admin/regions' }"
            >Регионы</router-link
          >
          <router-link
            to="/admin/booking/tours"
            :class="{ active: $route.path === '/admin/booking/tours' }"
            >Заявки</router-link
          >
          <router-link
            to="/admin/hotels"
            :class="{ active: $route.path === '/admin/hotels' }"
            >Отели</router-link
          >
          <router-link
            to="/admin/tours"
            :class="{ active: $route.path === '/admin/tours' }"
            >Туры</router-link
          >
        </nav>
        <button
          class="logout_admin content-admin"
          @click="logout"
          type="submit"
        >
          Выход
        </button>
      </div>
    </span>
    <div class="container" v-if="!$store.getters.isAdmin">
      <nav class="navigation content">
        <span class="nav" v-if="!$store.getters.isAuthenticated">
          <img
            class="logo_nav"
            alt="logo"
            src="../src/assets/images/logo_nav.png"
          />
          <div class="nav_link">
            <router-link to="/" :class="{ active: $route.path === '/' }"
              >Главная</router-link
            >
            <router-link
              to="/tours"
              :class="{ active: $route.path === '/tours' }"
              >Туры</router-link
            >
            <a
              href="#"
              @click.prevent="scrollToSection('regions')"
              :class="{ active: activeSection === 'regions' }"
              >Регионы</a
            >
            <a
              href="#"
              @click.prevent="scrollToSection('about')"
              :class="{ active: activeSection === 'about' }"
              >О нас</a
            >
            <a
              href="#"
              @click.prevent="scrollToSection('contacts')"
              :class="{ active: activeSection === 'contacts' }"
              >Контакты</a
            >
            <router-link to="/register">Регистрация</router-link>
            <router-link to="/login">Вход</router-link>
          </div>
        </span>
        <span class="nav_authenticated" v-if="$store.getters.isAuthenticated">
          <img
            class="logo_nav"
            alt="logo"
            src="../src/assets/images/logo_nav.png"
          />
          <div class="nav_link">
            <router-link to="/" :class="{ active: $route.path === '/' }"
              >Главная</router-link
            >
            <router-link to="/user/me">Личный кабинет</router-link>
            <router-link
              to="/tours"
              :class="{ active: $route.path === '/tours' }"
              >Туры</router-link
            >
            <a
              href="#"
              @click.prevent="scrollToSection('regions')"
              :class="{ active: activeSection === 'regions' }"
              >Регионы</a
            >
            <a
              href="#"
              @click.prevent="scrollToSection('about')"
              :class="{ active: activeSection === 'about' }"
              >О нас</a
            >
            <a
              href="#"
              @click.prevent="scrollToSection('contacts')"
              :class="{ active: activeSection === 'contacts' }"
              >Контакты</a
            >
            <router-link to="/" @click="logout">Выход</router-link>
          </div>
        </span>
      </nav>
    </div>
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
  <footer
    class="footer_container"
    v-if="!isAuthRelatedPage && !$store.getters.isAdmin"
  >
    <div class="footer">
      <img
        class="logo_footer"
        alt="logo_footer"
        src="../src/assets/images/logo_footer.png"
      />
      <span class="footer_nav" v-if="!$store.getters.isAuthenticated">
        <router-link to="/">Главная</router-link>
        <router-link to="/tours">Туры</router-link>
        <a href="#" @click.prevent="scrollToSection('regions')">Регионы</a>
        <a href="#" @click.prevent="scrollToSection('about')">О нас</a>
        <a href="#" @click.prevent="scrollToSection('contacts')">Контакты</a>
      </span>
      <span class="footer_nav" v-if="$store.getters.isAuthenticated">
        <router-link to="/">Главная</router-link>
        <router-link to="/user/me">Личный кабинет</router-link>
        <router-link to="/tours">Туры</router-link>
        <a href="#" @click.prevent="scrollToSection('regions')">Регионы</a>
        <a href="#" @click.prevent="scrollToSection('about')">О нас</a>
        <a href="#" @click.prevent="scrollToSection('contacts')">Контакты</a>
      </span>
      <div class="social_media_icons">
        <a href="#"><img src="../src/assets/images/telegram_icon.png" /></a>
        <a href="#"><img src="../src/assets/images/inst_icon.png" /></a>
        <a href="#"><img src="../src/assets/images/vk_icon.png" /></a>
      </div>
    </div>
  </footer>
</template>
<script>
import store from "@/store";

export default {
  data() {
    return {
      isAuthenticated: false,
      isAdmin: false,
      isAuthRelatedPage: false,
      activeSection: "",
    };
  },
  watch: {
    $route(to) {
      this.checkAuthRelatedPage(to.path);
    },
  },
  created() {
    this.$store.dispatch("fetchUserData");
  },
  methods: {
    checkAuthRelatedPage(path) {
      this.isAuthRelatedPage =
        path === "/login" ||
        path === "/register" ||
        path === "/password-recovery" ||
        path === "/reset-password" ||
        path === "/password-reset";
    },
    scrollToSection(sectionId) {
      this.activeSection = sectionId;
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
      window.location.reload();
    },
  },
};
</script>
