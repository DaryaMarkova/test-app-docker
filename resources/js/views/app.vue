<template>
  <div>
    <h3 class="header">Comments</h3>
    <sorting />
    <comment-list />
    <paginator :dataLength="dataLength" :pageSize="pageSize" />
    <add-comment />
  </div>
</template>

<script>
import Paginator from "./../components/paginator";
import AddComment from "./../components/addcomment";
import CommentList from "./../components/commentlist";
import Sorting from "./../components/sorting";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Paginator,
    AddComment,
    CommentList,
    Sorting
  },
  data() {
    return {
      pageSize: 3
    };
  },
  computed: {
    ...mapState({
      dataLength: state => state.allComments.length
    })
  }
};
</script>

<style>
@import url("./../../css/app.css");
</style>