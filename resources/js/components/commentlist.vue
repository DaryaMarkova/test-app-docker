<template>
  <div class="comment-list">
    <comment-item
      v-for="comment in displayedComments"
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
import { mapState, mapGetters } from "vuex";
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
    ...mapGetters(["displayedComments"]),
    ...mapState({
      allComments: state => state.allComments
    })
  }
};
</script>
<style scoped>
@import url("./../../css/commentlist.css");
</style>
