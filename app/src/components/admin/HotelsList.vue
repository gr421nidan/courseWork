<template>
  <div class="container">
    <div class="content-admin admin_page_content">
      <div class="admin_header_content">
        <button @click="logout" type="submit">Выход</button>
        <div>
          <h1>Отели</h1>
          <span v-if="!verifiedEmail">
            <button type="submit">Подтвердить почту</button>
          </span>
          <span v-if="verifiedEmail">
            <p>myemail@email.com</p>
          </span>
        </div>
        <div class="line_element"></div>
      </div>
      <div class="hotels_content">
        <div class="list_hotels">
          <li
            v-for="hotel in hotels"
            :key="hotel.id"
            @click="inHotel(hotel.id)"
          >
            {{ hotel.name }}
          </li>
        </div>
        <div class="hotels_create_block">
          <form @submit.prevent="createHotels" class="hotels_create">
            <h2>Добавить отель</h2>
            <div>
              <input
                class="input_form"
                type="text"
                v-model="formData.name"
                placeholder="Название"
              />
              <input
                class="input_form"
                type="text"
                v-model="formData.name"
                placeholder="Адрес"
              />
              <textarea
                class="textarea_form"
                v-model="formData.description"
                placeholder="Описание"
              />
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
export default {
  mixins: [getRegions],
  data() {
    return {
      formData: {
        name: "",
        address: "",
        photo: "",
        description: "",
        id_region: "",
      },
      hotels: [],
      regions: [],
      showBlock: false,
      verifiedEmail: false,
      error: "",
      message: "",
    };
  },
  created() {
    this.getHotels();
  },
  methods: {
    onFileChange(event) {
      this.formData.photo = event.target.files[0];
    },
    async getHotels() {
      const token = this.$store.state.token;
      const url = "http://127.0.0.1:8000/api/housing";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        this.hotels = result.data;
      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }
    },

    async createHotels() {
      const hotel = {
        name: this.formData.name,
        address: this.formData.address,
        description: this.formData.description,
        photo: this.formData.photo,
        id_region: this.formData.id_region,
      };
      const url = "http://127.0.0.1:8000/api/guide/create";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hotel),
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
        this.formData.address = "";
        this.formData.description = "";
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
    inHotel(id) {
      this.$router.push({ name: "AboutHotel", params: { id } });
    },
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("id_role");
      this.$router.push("/");
      window.location.reload();
    },
  },
};
</script>
