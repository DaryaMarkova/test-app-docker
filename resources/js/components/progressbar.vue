<template>
  <div>
    <div v-if="isError && !dismissError" class="status">{{errorMessage}}</div>
    <div v-if="isLoading" class="progress">
      <div class="progress-highlight"></div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "progress-bar",
  computed: {
    ...mapState({
      isError: state => state.isError,
      isLoading: state => state.isLoading,
      errorMessage: state => state.errorMessage
    })
  },
  data() {
    return {
      dismissError: true
    };
  },
  watch: {
    isError() {
      this.dismissError = false;
      setTimeout(() => {
        this.dismissError = true;
      }, 3000);
    }
  }
};
</script>
<style>
.progress {
  position: relative;
  width: 100%;
  height: 2px;
  text-align: center;
  background: #d6d6d6;
  border-radius: 2px;
  overflow: hidden;
}
.progress-highlight {
  position: absolute;
  left: 0px;
  top: -1px;
  width: 100px;
  height: 3px;
  background: #1284e7;
  animation: move 2s infinite;
}
.status {
  text-align: center;
  font-size: 0.9em;
  color: grey;
}
@keyframes move {
  from {
    left: 0px;
  }
  to {
    left: calc(100% - 100px);
  }
}
</style>