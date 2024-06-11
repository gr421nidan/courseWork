<template>
  <div class="container">
    <div class="content-admin admin_page_content">
      <div class="admin_header_content">
        <div>
          <h1>Регионы</h1>
        </div>
        <div class="line_element"></div>
      </div>
      <div v-if="showBlock" class="show-message">
        {{ message }}
      </div>
      <div class="regions_content">
        <div v-if="regions.length === 0">
          <p>Регионы отсутствуют!</p>
        </div>
        <div class="list_regions">
          <li v-for="region in regions" :key="region.id">
            {{ region.name }}
            <button @click="deleteRegion(region.id)">Удалить</button>
          </li>
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

export default {
  mixins: [getRegions],
  data() {
    return {
      formData: {
        name: "",
        photo: null,
      },
      user: {},
      regions: [],
      showBlock: false,
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
      const formData = new FormData();
      formData.append("name", this.formData.name);
      formData.append("photo", this.formData.photo);
      const token = this.$store.state.token;
      const url = "http://127.0.0.1:8000/api/region/create";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        const result = await response.json();
        if (response.ok) {
          this.message = result.message;
          this.showBlock = true;
          setTimeout(() => {
            this.showBlock = false;
          }, 3000);
          await this.getRegions();
        } else {
          this.message = result.errors.name || "Ошибка при создании региона";
          this.showBlock = true;
          setTimeout(() => {
            this.showBlock = false;
          }, 3000);
        }
      } catch (error) {
        this.message =
          "Произошла ошибка при создании региона. Попробуйте позже.";
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
      } finally {
        this.formData.name = "";
        this.formData.photo = null;
      }
    },
    async deleteRegion(id) {
      const token = this.$store.state.token;
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
        await this.getRegions();
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
  },
};
</script>
<style scoped></style>
