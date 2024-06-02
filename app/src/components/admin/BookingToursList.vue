<template>
  <div class="container">
    <div class="content-admin admin_page_content">
      <div class="admin_header_content">
        <button type="submit">Выход</button>
        <div>
          <h1>Заявки</h1>
          <span v-if="!verifiedEmail">
            <button type="submit">Подтвердить почту</button>
          </span>
          <span v-if="verifiedEmail">
            <p>myemail@email.com</p>
          </span>
        </div>
        <div class="line_element"></div>
      </div>
      <div class="booking_tours_content">
        <div class="list_booking_tours">
          <div v-if="booking_tours.length === 0">
            <p>Заявки отсутствуют!</p>
          </div>
          <div v-for="booking_tour in booking_tours" :key="booking_tour.id">
            {{ booking_tour.name }}
            <button @click="deleteRegion(region.id)">Удалить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>
<style scoped></style>
