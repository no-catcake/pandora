<script setup>
  import { CopyDocument, Edit, Remove } from '@element-plus/icons-vue';

  const props = defineProps(['queries']);


</script>

<template>
  <el-table :data="queries" style="width: 100%">
    <el-table-column fixed prop="name" label="Name" width="150" />
    <el-table-column prop="alias" label="引用别名" width="120" />
    <el-table-column prop="data_source.type" label="数据源类型" width="120" />
    <el-table-column prop="data_source.type" label="数据源" width="120" />
    <el-table-column prop="query" label="查询语句" show-overflow-tooltip />
    <el-table-column fixed="right" label="Operations" width="150">
      <template #default="scope">
        <el-button :icon="Edit" circle @click="editQuery(scope.$index)" />
        <el-button :icon="CopyDocument" circle @click="copyQuery(scope.$index)" />
        <el-button :icon="Remove" circle @click="deleteQuery(scope.$index)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss"></style>
