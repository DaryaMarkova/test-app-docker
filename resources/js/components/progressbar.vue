<template>
  <div class="progress">
    <div class="progress-highlight"></div>
  </div>
</template>
<script>
export default {
  name: "progress-bar"
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
@keyframes move {
  from {
    left: 0px;
  }
  to {
    left: calc(100% - 100px);
  }
}
</style>