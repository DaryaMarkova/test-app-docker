<template>
  <div class="pagination">
    <a
      v-if="dataLength > 0"
      @click="showPagesBack"
      class="pagination-link pagination-link__back"
    >&#171;</a>
    <a
      :key="index"
      v-for="(item, index) in pageOffset"
      @click="notifySelectedRange(index + startPage)"
      v-bind:class="{ active: index + startPage === currentPage }"
      class="pagination-link"
      href="#"
    >{{ index + startPage }}</a>
    <a
      class="pagination-link pagination-link__forward"
      v-if="dataLength > 0"
      @click="showPagesForward"
    >&#187;</a>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { Types } from "./../store/";

export default {
  name: "paginator",
  props: {
    dataLength: Number,
    pageSize: Number
  },
  data() {
    return {
      startPage: 1,
      currentPage: 1
    };
  },
  watch: {
    dataLength: {
      handler(newLength) {
        let startIndex = this.getStartIndex(),
          endIndex = this.getEndIndex();
        // удалили все элементы с последней страницы - возвращаемся на предыдущую
        if (startIndex >= newLength) {
          this.currentPage -= 1;
          startIndex = this.getStartIndex();
        }
        this.$store.commit("setDataRange", [startIndex, endIndex]);
      }
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.dataLength / this.pageSize);
    },
    pageOffset() {
      return Math.min(5, this.pageCount);
    }
  },
  methods: {
    ...mapActions({
      setDataRange: Types.SET_RANGE
    }),
    notifySelectedRange(pageNumber) {
      this.currentPage = pageNumber;
      this.setDataRange([this.getStartIndex(), this.getEndIndex()]);
    },
    showPagesForward() {
      const start = this.startPage,
        count = this.pageCount,
        offset = this.pageOffset;
      this.startPage = start < count - offset ? start + offset : start;
    },
    showPagesBack() {
      const start = this.startPage,
        offset = this.pageOffset;
      this.startPage = start > offset ? start - offset : start;
    },
    getStartIndex() {
      return Math.max((this.currentPage - 1) * this.pageSize, 0);
    },
    getEndIndex() {
      return this.getStartIndex() + this.pageSize;
    }
  }
};
</script>

<style scoped>
@import url("./../../css/paginator.css");
</style>
