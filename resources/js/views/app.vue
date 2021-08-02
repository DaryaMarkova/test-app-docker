<template>
  <div>
    <progress-bar />
    <h3 class="header">Comments</h3>
    <sorting />
    <comment-list />
    <paginator :dataLength="displayedComments.length" :pageSize="pageSize" />
    <add-comment />
  </div>
</template>

<script>
import Paginator from "./../components/paginator";
import AddComment from "./../components/addcomment";
import CommentList from "./../components/commentlist";
import Sorting from "./../components/sorting";
import ProgressBar from "./../components/progressbar";
import { mapState, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Paginator,
    AddComment,
    CommentList,
    ProgressBar,
    Sorting
  },
  data() {
    return {
      pageSize: 3
    };
  },
  computed: {
    ...mapGetters(["displayedComments"])
  }
};
</script>

<style>
@import url("./../../css/app.css");
</style>