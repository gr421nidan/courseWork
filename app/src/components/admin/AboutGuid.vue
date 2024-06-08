<template>
  <div class="container">
    <div class="content-admin admin_page_content">
      <div class="admin_header_content">
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
      <div class="guid_content">
        <div class="guid_content_about">
          <div class="card_guid">
            <div class="card_guid_content">
              <div class="card_guid_text">
                <h3>{{ guide.name }} {{ guide.surname }}</h3>
                <p>{{ nameRegion }}</p>
                <p>{{ guide.description }}</p>
              </div>
              <button type="submit" class="delete_button">Удалить</button>
            </div>
            <img :src="guide.photo" />
          </div>
          <div class="guids_update_block">
            <form @submit.prevent="updateGuide" class="guids_create">
              <h2>Редактировать экскурсовода</h2>
              <div>
                <textarea
                  class="textarea_form"
                  v-model="formData.description"
                  placeholder="Описание"
                />
              </div>
              <button class="button_admin_pages" type="submit">
                Сохранить
              </button>
            </form>
          </div>
        </div>
        <div class="guid_content_tours">
          <h3>Туры</h3>
          <span>
            <li></li>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutHotel",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        description: "",
      },
      guide: {},
      nameRegion: "",
    };
  },
  methods: {
    async getAboutGuide() {
      const token = this.$store.state.token;
      const url = `http://127.0.0.1:8000/api/guide/${this.id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        this.guide = result.guid;
        this.nameRegion = result.name_region;
      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }
    },
    async updateGuide() {
      const token = this.$store.state.token;
      const url = `http://127.0.0.1:8000/api/guide/update/${this.id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: this.formData.description,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        this.guide = result.guide;
        this.formData.description = "";
        console.log(result);
      } else {
        this.error = "Ошибка при обновлении гида";
        console.error(this.error);
      }
    },
  },
  created() {
    this.getAboutGuide();
  },
};
</script>
<style scoped></style>
