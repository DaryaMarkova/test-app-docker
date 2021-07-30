<template>
  <div class="statusbar">
    <span>Loading...</span>
  </div>
</template>
<script>
export default {
  name: "status-bar"
};
</script>
<style>
.statusbar {
  position: fixed;
  width: 100%;
  height: 24px;
  line-height: 24px;
  top: 0px;
  color: white;
  background: #1284e7;
  font-size: 0.9em;
}
</style>