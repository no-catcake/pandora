<script setup>
  import ERow from './row.vue';

  const props = defineProps(['span', 'label']);
</script>

<template>
  <e-row :span="span">
    <el-form-item :label="label">
      <slot></slot>
    </el-form-item>
  </e-row>
</template>

<style scoped lang="scss"></style>
