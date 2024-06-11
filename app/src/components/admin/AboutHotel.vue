<template>
  <div class="container">
    <div class="content-admin admin_page_content">
      <div class="admin_header_content">
        <div>
          <h1>Отель - {{ hotel.name }}</h1>
        </div>
        <div class="line_element"></div>
      </div>
      <div class="hotel_content">
        <div class="hotel_info_text">
          <p>
            {{ hotel.description }}
          </p>
          <div>
            <p>Адресс:</p>
            <p>
              {{ hotel.address }}
            </p>
          </div>
          <button
            @click="deleteHotel(hotel.id)"
            class="delete_button"
            type="submit"
          >
            Удалить
          </button>
        </div>
        <div class="hotel_photos">
          <span class="photos_hotel_content">
            <img :src="hotel.photo[currentPhotoIndex]" />
          </span>
          <div class="arrows_row">
            <img
              alt="arrow_left"
              src="../../assets/images/arrow_left.png"
              @click="backPhoto"
            />
            <img
              class="arrow_hotel_right"
              alt="arrow_right"
              src="../../assets/images/arrow_left.png"
              @click="nextPhoto"
            />
          </div>
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
      hotel: {
        photo: [],
      },
      currentPhotoIndex: 0,
      user: {},
    };
  },
  methods: {
    async getAboutHotel() {
      const token = this.$store.state.token;
      const url = `http://127.0.0.1:8000/api/housing/admin/${this.id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        this.hotel = result.housing;
      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }
    },
    backPhoto() {
      if (this.currentPhotoIndex > 0) {
        this.currentPhotoIndex--;
      } else {
        this.currentPhotoIndex = this.hotel.photo.length - 1;
      }
    },
    nextPhoto() {
      if (this.currentPhotoIndex < this.hotel.photo.length - 1) {
        this.currentPhotoIndex++;
      } else {
        this.currentPhotoIndex = 0;
      }
    },
    async deleteHotel(id) {
      const token = this.$store.state.token;
      const url = `http://127.0.0.1:8000/api/housing/delete/${id}`;
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
        this.$router.push("/admin/hotels");
      } else {
        this.message = result.message;
        this.showBlock = true;

        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
      }
    },
  },
  created() {
    this.getAboutHotel();
  },
};
</script>
<style scoped></style>
