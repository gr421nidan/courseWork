<!--app/src/components/user/BookingTour.vue-->
<template>
  <div class="container">
    <div class="content">
      <div class="content_tour_booked">
        <router-link to="/tours">Вернуться назад</router-link>
        <div class="content_booked_tour">
          <div>
            <div class="booked_create_block">
              <div class="booked_create_content">
                <h2>{{ tour.name }}</h2>
                <p>с {{ tour.date_start }} по {{ tour.date_end }}</p>
                <div class="show-message" v-if="showBlock">
                  {{ message }}
                </div>
                <form @submit.prevent="BookingTour">
                  <div>
                    <label class="label_input_booked"
                      >Номер телефона
                      <input
                        class="input_booked"
                        type="tel"
                        v-model="formData.tel"
                    /></label>
                    <label class="label_small"
                      >Взрослых(от 18 лет)
                      <input
                        class="input_booked_small"
                        type="number"
                        v-model="formData.count_adults"
                    /></label>
                    <label class="label_small"
                      >Детей(до 18 лет)
                      <input
                        class="input_booked_small"
                        type="number"
                        v-model="formData.count_children"
                    /></label>
                  </div>
                  <label
                    >Ваши пожелания
                    <textarea
                      v-model="formData.wishes"
                      placeholder="Ваши комментарии или пожелания"
                    ></textarea>
                  </label>
                  <button type="submit">Отправить заявку</button>
                </form>
              </div>
            </div>
            <div class="block_services">
              <div>
                <p><strong>Включено в стоимость</strong></p>
                <li>проживание</li>
                <li>транспортные услуги;</li>
                <li>работа гида-инструктора</li>
                <li>питание трехразовое по программе;</li>
              </div>
              <div>
                <p><strong>Не входит в тур</strong></p>
                <li>личные расходы</li>
                <li>авиа- и ж/д билеты</li>
                <li>дополнительные экскурсии по желанию.</li>
              </div>
            </div>
          </div>
          <div class="info_booked">
            <h3>Как купить?</h3>
            <div class="info_booked_column">
              <div>
                <span class="circle_info"></span>
                <li>Заявка</li>
              </div>
              <div>
                <span class="circle_info"></span>
                <li>Бронирование</li>
              </div>
              <p>
                На основании присланной Вами анкеты осуществляется бронирование
                мест, Вам высылается подтверждение бронирования, договор и счет.
              </p>
              <div>
                <span class="circle_info"></span>
                <li>Оплата</li>
              </div>
              <p>
                В период от 1 до 5 календарных дней после подтверждения заявки
                внести предоплату. Точные сроки и условия оплаты сообщит
                менеджер тура. Внести полную оплату по договору обычно нужно не
                позднее чем за 2 недели до начала поездки.
              </p>
              <div>
                <span class="circle_info"></span>
                <li>Отправляйтесь в тур</li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAboutTour } from "@/mixins/getAboutTour";

export default {
  mixins: [getAboutTour],
  name: "bookingTour",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        tel: "",
        count_adults: 0,
        count_children: 0,
        wishes: "",
      },
      tour: {},
      showBlock: false,
      message: "",
    };
  },
  created() {
    this.getAboutTour();
  },
  methods: {
    async BookingTour() {
      const booking = {
        tel: this.formData.tel,
        count_adults: this.formData.count_adults,
        count_children: this.formData.count_children,
        wishes: this.formData.wishes,
        id_tour: this.id,
        id_user: this.$store.state.userId,
      };

      const token = this.$store.state.token;
      const url = "http://127.0.0.1:8000/api/booked/create";

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(booking),
        });
        const result = await response.json();
        if (response.ok) {
          this.message = result.message;
          this.showBlock = true;
          setTimeout(() => {
            this.showBlock = false;
          }, 3000);
          this.$router.push("/user/me");
        } else {
          throw new Error(result.message || "Ошибка при отправке данных");
        }
      } catch (error) {
        this.message = error.message;
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
