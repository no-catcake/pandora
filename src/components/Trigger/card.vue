<script setup>
  const props = defineProps(['title']);
  const emit = defineEmits(['add']);
</script>

<template>
  <n-card :title="title" hoverable>
    <template #header-extra>
      <n-button dashed type="primary" @click="emit('add')"> 新增 </n-button>
    </template>
    <n-form label-placement="left" label-width="auto">
      <n-collapse :trigger-areas="['main', 'arrow']">
        <slot></slot>
      </n-collapse>
    </n-form>
  </n-card>
</template>

<style scoped></style>
