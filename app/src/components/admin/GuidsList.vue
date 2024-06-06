<template>
  <div class="container">
    <div class="content-admin admin_page_content">
      <div class="admin_header_content">
        <button @click="logout" type="submit">Выход</button>
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
          <li
            v-for="guide in guids"
            :key="guide.guide.id"
            @click="inGuide(guide.guide.id)"
          >
            {{ guide.guide.name }} {{ guide.guide.surname }}
          </li>
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
      if (!this.formData.photo) {
        this.message = "Пожалуйста, выберите фото.";
        return;
      }
      const formData = new FormData();
      formData.append("name", this.formData.name);
      formData.append("surname", this.formData.surname);
      formData.append("description", this.formData.description);
      formData.append("photo", this.formData.photo);
      formData.append("id_region", this.formData.id_region);

      const token = this.$store.state.token;
      const url = "http://127.0.0.1:8000/api/guide/create";
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
        await this.getGuids();
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
      } else {
        this.surname = "";
        this.name = "";
        this.description = "";
        this.photo = "";
        this.id_region = "";
        this.error = result.error;
        this.showBlock = true;

        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
        console.error("Ошибка:", this.error);
      }
    },
    inGuide(id) {
      this.$router.push({ name: "AboutGuide", params: { id } });
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
