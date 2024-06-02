<script setup></script>

<template>
  <div class="container">
    <div class="content">
      <div class="feedback_create_block">
        <router-link to="/tour/id/">Вернуться назад</router-link>
        <div class="feedback_create_content">
          <h1>Написать отзыв</h1>
          <p>Отзыв о туре: Просторы Шерегеша</p>
          <p class="warning_block">
            Во избежание накрутки отзыв можно оставить,<br />
            только если Вы до этого купили тур.
          </p>
          <form method="post">
            <div class="rating_feedback">
              <p>Рейтинг</p>
              <div class="rating_area">
                <input type="radio" id="star-5" name="rating" value="5" />
                <label for="star-5" title="Оценка «5»"></label>
                <input type="radio" id="star-4" name="rating" value="4" />
                <label for="star-4" title="Оценка «4»"></label>
                <input type="radio" id="star-3" name="rating" value="3" />
                <label for="star-3" title="Оценка «3»"></label>
                <input type="radio" id="star-2" name="rating" value="2" />
                <label for="star-2" title="Оценка «2»"></label>
                <input type="radio" id="star-1" name="rating" value="1" />
                <label for="star-1" title="Оценка «1»"></label>
              </div>
            </div>
            <div class="comment_feedback">
              <p>Текст отзыва</p>
              <textarea
                placeholder="Расскажите о ваших впечатлениях"
              ></textarea>
            </div>
            <input
              type="file"
              multiple
              placeholder="Добавить фото к вашему отзыву"
            />
            <p class="constraint">
              Можно добавить до 3 фотографий, размер загружаемого файла не
              должен превышать 5 мб. Допустимые форматы изображений - JPEG, PNG,
              JPG, WEBP
            </p>
            <button class="btn_create_feedback" type="submit">
              Отправить отзыв
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
