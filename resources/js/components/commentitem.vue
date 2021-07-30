<template>
  <div class="comment d-flex">
    <div class="comment-avatar"></div>
    <div class="comment-body">
      <b class="comment-body__name">{{ name }}</b>
      <span class="comment-body__time">{{ formattedDate }}</span>
      <p class="comment-body__text">{{ text }}</p>
      <a @click="remove(id)" class="comment-body__delete-button">Удалить</a>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapActions } from "vuex";
import { Types } from "./../store/";

export default {
  name: "comment-item",
  props: {
    id: Number,
    name: String,
    text: String,
    date: String
  },
  computed: {
    formattedDate() {
      return moment(this.date).format("MMMM Do YYYY, h:mm:ss");
    }
  },
  methods: {
    ...mapActions({
      remove: Types.DELETE
    })
  }
};
</script>
<style scoped>
@import url("./../../css/comment.css");
</style>
