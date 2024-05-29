<script setup>
  const props = defineProps(['span']);
</script>

<template>
  <el-row :gutter="10">
    <el-col :span="span">
      <slot></slot>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss"></style>
