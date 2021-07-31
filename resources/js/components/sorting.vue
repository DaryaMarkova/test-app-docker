<template>
  <div class="comment-sorting">
    <a
      class="comment-sorting__button"
      v-bind:class="{ 'arrowed-up': idOrder > 0, 'arrowed-down': idOrder < 0 }"
      @click="toggleSortingIdOrder"
    >Id</a>
    <a
      class="comment-sorting__button arrowed-up"
      v-bind:class="{
        'arrowed-up': dateOrder > 0,
        'arrowed-down': dateOrder < 0,
      }"
      @click="toggleSortingDateOrder"
    >Date</a>
    <span class="comment-sorting__button">From:</span>
    <date-picker class="datepicker" v-model="dateFrom" />
    <span class="comment-sorting__button">&nbsp;To:</span>
    <date-picker class="datepicker" v-model="dateTo" />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { Types } from "./../store/";
import moment from "moment";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "sorting",
  components: {
    DatePicker
  },
  data() {
    return {
      idOrder: -1, // направление сортировки по id
      dateOrder: -1, // направление сортировки по дате
      dateFrom: null, // стартовая
      dateTo: null // и конечная дата для фильтрации и поиска по диапазону
    };
  },
  methods: {
    ...mapActions({
      setPredicate: Types.SET_PREDICATE,
      setFilter: Types.SET_FILTER
    }),
    toggleSortingIdOrder() {
      this.idOrder *= -1;

      this.setPredicate((item1, item2) => this.idOrder * (item1.id - item2.id));
    },
    toggleSortingDateOrder() {
      this.dateOrder *= -1;

      const predicate = (item1, item2) =>
        this.dateOrder *
        (moment(item1.date).unix() - moment(item2.date).unix());

      this.setPredicate(predicate);
    },
    getFilterByDates(startDate, endDate) {
      const getTime = date => moment(date).unix();
      const endOfDateTo = endDate
        ? moment(endDate).add({
            hours: 23,
            minutes: 59,
            seconds: 59
          })
        : null;

      if (startDate && endOfDateTo) {
        return item => {
          const time = getTime(item.date);
          return time >= getTime(startDate) && time <= getTime(endOfDateTo);
        };
      } else if (startDate) {
        return item => {
          const time = getTime(item.date);
          return time >= getTime(startDate);
        };
      } else {
        return item => {
          const time = getTime(item.date);
          return time <= getTime(endOfDateTo);
        };
      }
    }
  },
  watch: {
    dateFrom(newDateFrom) {
      const filter = this.getFilterByDates(newDateFrom, this.dateTo);
      this.setFilter(filter);
    },
    dateTo(newDateTo) {
      const filter = this.getFilterByDates(this.dateFrom, newDateTo);
      this.setFilter(filter);
    }
  }
};
</script>
<style scoped>
@import url("./../../css/sorting.css");
</style>
