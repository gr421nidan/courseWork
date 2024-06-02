<template>
  <div class="container">
    <div class="content-admin admin_page_content">
      <div class="admin_header_content">
        <button type="submit">Выход</button>
        <div>
          <h1>Экскурсоводы</h1>
          <span v-if="!verifiedEmail">
            <button type="submit">Подтвердить почту</button>
          </span>
          <span v-if="verifiedEmail">
            <p>myemail@email.com</p>
          </span>
        </div>
        <div class="line_element"></div>
      </div>
      <div class="guids_content">
        <div class="list_guids">
          <div v-if="guids.length === 0">
            <p>Экскурсоводы отсутствуют!</p>
          </div>
          <ul>
            <li v-for="guid in guids" :key="guid.id">
              {{ guid.name }} {{ guid.surname }}
            </li>
          </ul>
        </div>
        <div class="guids_create_block">
          <form @submit.prevent="createGuids" class="guids_create">
            <h2>Добавить экскурсовода</h2>
            <div>
              <input
                class="input_form"
                type="text"
                v-model="formData.surname"
                placeholder="Фамилия"
              />
              <input
                class="input_form"
                type="text"
                v-model="formData.name"
                placeholder="Имя"
              />
              <textarea
                class="textarea_form"
                v-model="formData.description"
                placeholder="Описание"
              />
              <input
                class="input_form"
                type="file"
                @change="onFileChange"
                placeholder="Добавить фото"
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
import { getGuids } from "/src/mixins/getGuids";
export default {
  mixins: [getRegions, getGuids],
  data() {
    return {
      formData: {
        name: "",
        surname: "",
        photo: "",
        description: "",
        id_region: "",
      },
      guids: [],
      regions: [],
      showBlock: false,
      verifiedEmail: false,
      error: "",
      message: "",
    };
  },
  created() {
    this.getGuids();
    this.getRegions();
  },
  methods: {
    onFileChange(event) {
      this.formData.photo = event.target.files[0];
    },
    async createGuids() {
      const guid = {
        name: this.formData.name,
        surname: this.formData.surname,
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
        body: JSON.stringify(guid),
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
        this.formData.surname = "";
        this.formData.name = "";
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
  },
};
</script>
