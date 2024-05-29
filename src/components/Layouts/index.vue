<script setup>
  const props = defineProps(['title', 'description']);
</script>

<template>
  <el-form label-width="auto">
    <el-card>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <el-row :gutter="10">
        <el-col :span="8">
          <slot name="detail"></slot>
        </el-col>
        <el-col :span="16">
          <el-card>
            <slot name="basic_config"></slot>
          </el-card>
        </el-col>
      </el-row>
      <el-divider />
      <el-card>
        <el-tabs tabPosition="left">
          <slot name="pane"></slot>
        </el-tabs>
      </el-card>
    </el-card>
  </el-form>
</template>

<style scoped lang="scss"></style>
