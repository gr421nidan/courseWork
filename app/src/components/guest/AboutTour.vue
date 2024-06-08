<template>
  <div class="container">
    <div class="content">
      <section class="about_tour_content">
        <div>
          <router-link to="/tours">Вернуться назад</router-link>
          <div class="block_about_tour_content">
            <img alt="photo_tour" src="" />
            <div class="block_about_tour">
              <h1>{{ tour.name }}</h1>
              <div class="block_about_tour_text">
                <p>{{ nameRegion }}</p>
                <p>с {{ tour.date_start }} по {{ tour.date_end }}</p>
                <p>Экскурсовод {{ nameGuide }}</p>
                <p>{{ tour.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="line_element"></div>
      </section>
      <section class="program_tour_content">
        <div class="blocks_about_tour">
          <div class="enabled_in_tour">
            <img src="" />
            <div class="enabled_in_tour_text">
              <h3>42 000 руб.</h3>
              <div>
                <p>Что включено в тур:</p>
                <ul>
                  <li>Проживание в уютном отеле на курорте.</li>
                  <li>Горнолыжный абонемент на все дни пребывания</li>
                  <li>Экскурсии и развлечения по программе.</li>
                  <li>Трансферы из/в аэропорт или железнодорожный вокзал.</li>
                </ul>
              </div>

              <button class="program_btn">
                <router-link to="/booked/create">Забронировать</router-link>
              </button>
              <div id="block_about_price">
                <p>Не требует оплаты сейчас</p>
                <div class="circle">?</div>
              </div>
            </div>
          </div>
          <div class="program_tour">
            <h1>Программа тура:</h1>
            <div>
              <p>День 1: Прибытие в Шерегеш</p>
              <ul>
                <li>Встреча на курорте и размещение в уютном отеле.</li>
                <li>Свободное время на адаптацию и отдых после переезда.</li>
              </ul>
            </div>
            <div>
              <p>День 2-5: Горнолыжные спуски и экскурсии</p>
              <ul>
                <li>
                  Утренние горнолыжные спуски на самых интересных склонах
                  Шерегеша под руководством опытных инструкторов.
                </li>
                <li>
                  Экскурсии по окрестностям курорта с посещением местных
                  достопримечательностей и панорамных видовых площадок.
                </li>
                <li>
                  Вечерние развлечения в курортных барах и ресторанах, где вы
                  сможете насладиться атмосферой зимнего веселья и попробовать
                  местные кулинарные изыски.
                </li>
              </ul>
            </div>
            <div>
              <p>День 6: Отъезд</p>
              <ul>
                <li>
                  Утренний отъезд из Шерегеша с наслаждением последними
                  впечатлениями от зимнего курорта.
                </li>
                <li>
                  Переезд в аэропорт или железнодорожный вокзал для отправления
                  домой.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="tour_info_block">
          <div class="info_tour_column_one">
            <h4>Проживание во время тура</h4>
            <p>Отель Йети Хаус</p>
            <div id="address_block">
              <img src="" />
              <p>
                Кемеровская область, Таштагольский р-н, п. Шерегеш, ул. Снежная,
                д. 50
              </p>
            </div>
          </div>
          <div class="info_tour_column_two">
            <h4>Минимальный возраст</h4>
            <p>12 лет</p>
          </div>
          <div class="info_tour_column_three">
            <h4>Задайте вопрос координатору тура</h4>
            <h4>8-800-200-70-23</h4>
            <p>Бесплатно по России</p>
          </div>
        </div>
        <div class="line_element"></div>
      </section>
      <section class="hotel_content">
        <h1>Отель Йети Хаус</h1>
        <div class="hotel_info">
          <div class="hotel_info_text">
            <p>
              Уютный уголок в сердце зимних гор! Расположенный среди
              величественных горных вершин и покрытых снегом лесов, отель
              предлагает непревзойденный комфорт и удобства для вашего зимнего
              отдыха.<br />
              Гостям предлагается 48 комфортабельных номеров различных
              категорий. В ресторане отеля подаются блюда русской, европейской и
              японской кухни. Каждое утро предлагается континентальный завтрак
              «шведский стол». Для путешественников на машине организована
              парковка.
            </p>
            <div>
              <p>Адресс:</p>
              <p>
                Кемеровская обл., Таштагольский р-н, п. Шерегеш, ул. Снежная, д.
                50
              </p>
            </div>
          </div>
          <div class="hotel_photos">
            <div class="photos_hotel_content">
              <img src="" />
              <div class="block_photo"></div>
            </div>
            <div class="arrows_row">
              <img alt="arrow_left" src="" />
              <img class="arrow_main_right" alt="arrow_right" src="" />
            </div>
          </div>
        </div>

        <div class="line_element"></div>
      </section>
      <section class="feedback_content">
        <div class="head_feedback_content">
          <h1>Отзывы о туре</h1>
          <button class="btn_feedback">
            <router-link to="/feedback/create">Оставить отзыв</router-link>
          </button>
        </div>
        <div>
          <div>
            <h3>Мария</h3>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { getAboutTour } from "@/mixins/getAboutTour";

export default {
  mixins: [getAboutTour],
  name: "aboutTour",
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
      hotels: [],
      guids: [],
      tour: {},
      statuses: [],
      error: "",
      message: "",
      nameRegion: "",
      nameGuide: "",
      nameHotel: "",
      programTour: "",
      statusTour: "",
    };
  },
  created() {
    this.getAboutTour();
  },
};
</script>
<style scoped></style>
