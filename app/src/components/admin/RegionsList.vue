<template>
  <div class="container">
    <div class="content-admin admin_page_content">
      <div class="admin_header_content">
        <button type="submit">Выход</button>
        <div>
          <h1>Регионы</h1>
          <span v-if="!verifiedEmail">
            <button type="submit">Подтвердить почту</button>
          </span>
          <span v-if="verifiedEmail">
            <p>myemail@email.com</p>
          </span>
        </div>
        <div class="line_element"></div>
      </div>
      <div class="regions_content">
        <div class="list_regions">
          <div v-if="regions.length === 0">
            <p>Регионы отсутствуют!</p>
          </div>
          <ul>
            <li v-for="region in regions" :key="region.id">
              {{ region.name }}
              <button @click="deleteRegion(region.id)">Удалить</button>
            </li>
          </ul>
        </div>
        <div class="regions_create_block">
          <form @submit.prevent="createRegions" class="regions_create">
            <h2>Добавить регион</h2>
            <div>
              <input
                class="input_form"
                type="text"
                v-model="formData.name"
                placeholder="Название"
              />
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
        photo: "",
      },
      regions: [],
      showBlock: false,
      verifiedEmail: false,
      error: "",
      message: "",
    };
  },
  created() {
    this.getRegions();
  },
  methods: {
    onFileChange(event) {
      this.formData.photo = event.target.files[0];
    },
    async createRegions() {
      const region = {
        name: this.formData.name,
        photo: this.formData.photo,
      };
      const url = "http://127.0.0.1:8000/api/guide/create";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(region),
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
        this.formData.photo = "";
        this.error = result.error;
        this.showBlock = true;

        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
        console.error("Ошибка:", this.error);
      }
    },
    async deleteRegion(id) {
      const token = localStorage.getItem("token");
      const url = `http://127.0.0.1:8000/api/region/delete/${id}`;
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
      } else {
        this.error = result.error;
        this.showBlock = true;

        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
        console.error("Ошибка:", this.error);
      }
    },
  },
};
</script>
<style scoped></style>
