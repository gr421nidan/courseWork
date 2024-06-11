<template>
  <div class="container">
    <div class="content-admin admin_page_content">
      <div class="admin_header_content">
        <div>
          <h1>Отели</h1>
        </div>
        <div class="line_element"></div>
      </div>
      <div class="hotels_content">
        <div v-if="hotels.length === 0">
          <p>Отели отсутствуют!</p>
        </div>
        <div class="list_hotels">
          <li
            v-for="hotel in hotels"
            :key="hotel.id"
            @click="inHotel(hotel.id)"
          >
            {{ hotel.name }}
          </li>
        </div>
        <div v-if="showBlock" class="show-message">
          {{ message }}
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
                v-model="formData.address"
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
              <label for="file-upload" class="custom-file-upload">
                Добавить фото
                <input
                  id="file-upload"
                  class="input_file"
                  type="file"
                  @change="onFileChange"
                  multiple
                />
              </label>
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
import { getHotels } from "@/mixins/getHotels";

export default {
  mixins: [getRegions, getHotels],
  data() {
    return {
      formData: {
        name: "",
        address: "",
        photo: [],
        description: "",
        id_region: "",
      },
      hotels: [],
      regions: [],
      showBlock: false,
      verifiedEmail: false,
      error: "",
      message: "",
      user: {},
    };
  },
  created() {
    this.getHotels();
    this.getRegions();
  },
  methods: {
    onFileChange(event) {
      this.formData.photo = Array.from(event.target.files);
    },

    async createHotels() {
      if (!this.formData.photo.length) {
        this.message = "Пожалуйста, выберите фото.";
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
        return;
      }

      const formData = new FormData();
      formData.append("name", this.formData.name);
      formData.append("address", this.formData.address);
      formData.append("description", this.formData.description);
      formData.append("id_region", this.formData.id_region);

      this.formData.photo.forEach((file, index) => {
        formData.append(`photo[${index}]`, file);
      });

      const token = this.$store.state.token;
      const url = "http://127.0.0.1:8000/api/housing/photo";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        this.message = result.message;
        this.showBlock = true;
        this.formData = {
          name: "",
          address: "",
          photo: [],
          description: "",
          id_region: "",
        };
        await this.getHotels();
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
      } else {
        this.message = result.message;
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
      }
    },
    inHotel(id) {
      this.$router.push({ name: "AboutHotel", params: { id } });
    },
  },
};
</script>
<style>
select {
  padding-right: 20px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url('data:image/svg+xml;utf8,<svg fill="%23000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>')
    no-repeat right 10px center;
  background-color: white;
  background-size: 40px;
}
</style>
