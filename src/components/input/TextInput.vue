<script setup>
  const props = defineProps(['label']);
  const model = defineModel();
</script>

<template>
  <div style="display: flex; justify-content: flex-start">
    <strong>{{ label }}</strong>
    <el-input></el-input>
  </div>
</template>

<style scoped lang="scss"></style>
