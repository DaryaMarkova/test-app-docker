<template>
  <div class="add-comment__form">
    <input v-model="commentAuthor" placeholder="Your name" class="add-comment__form-field" />

    <textarea
      rows="5"
      v-model="commentText"
      placeholder="Leave a comment"
      class="add-comment__form-field"
    ></textarea>

    <button class="accent-button" @click="addComment" @keyup.enter="addComment">Add comment</button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { Types } from "./../store/";

export default {
  name: "add-comment",
  data() {
    return {
      commentAuthor: "",
      commentText: ""
    };
  },
  methods: {
    ...mapActions({
      add: Types.ADD
    }),
    addComment() {
      this.add({
        text: this.commentText,
        name: this.commentAuthor || "Anonymous",
        date: new Date().toISOString()
      });
    }
  }
};
</script>

<style>
@import url("./../../css/addcomment.css");
</style>
