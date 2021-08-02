<template>
  <div class="comment-list">
    <comment-item
      v-for="comment in slicedDisplayedComments"
      :key="comment.id"
      :id="comment.id"
      :name="comment.name"
      :date="comment.date"
      :text="comment.text"
    />
  </div>
</template>
<script>
import CommentItem from "./commentitem";
import { mapGetters } from "vuex";
import { Types } from "./../store/";
export default {
  name: "comment-list",
  components: {
    CommentItem
  },
  mounted() {
    this.$store.dispatch(Types.LOAD);
  },
  computed: {
    ...mapGetters(["slicedDisplayedComments"])
  }
};
</script>
<style scoped>
@import url("./../../css/commentlist.css");
</style>
