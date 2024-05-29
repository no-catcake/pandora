<script setup>
  import { defineModel } from 'vue';
  import { CircleCloseFilled } from '@element-plus/icons-vue';

  const visible = defineModel();
</script>

<template>
  <el-dialog v-model="visible" :show-close="false" width="80%">
    <template #header="{ close, titleId, titleClass }">
      <div class="header">
        <strong :id="titleId" :class="titleClass"> Edit</strong>
        <el-button text @click="close">
          <el-icon class="el-icon--left">
            <CircleCloseFilled />
          </el-icon>
          Close
        </el-button>
      </div>
    </template>
    <el-row :gutter="20">
      <el-col :span="16">
        <slot name="left"></slot>
      </el-col>
      <el-col :span="8">
        <slot name="right"></slot>
      </el-col>
    </el-row>
    <slot></slot>
  </el-dialog>
</template>

<style scoped lang="scss">
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
  }
</style>
