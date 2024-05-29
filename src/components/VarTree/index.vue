<script setup>
  import VarTree from './index.vue';
  import { ref } from 'vue';

  const props = defineProps(['vars']);
  const dataSource = ref([
    {
      id: 1,
      label: 'Level one 1',
      children: [
        {
          id: 4,
          label: 'Level two 1-1',
          children: [
            {
              id: 9,
              label: 'Level three 1-1-1',
            },
            {
              id: 10,
              label: 'Level three 1-1-2',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      label: 'Level one 2',
      children: [
        {
          id: 5,
          label: 'Level two 2-1',
        },
        {
          id: 6,
          label: 'Level two 2-2',
        },
      ],
    },
    {
      id: 3,
      label: 'Level one 3',
      children: [
        {
          id: 7,
          label: 'Level two 3-1',
        },
        {
          id: 8,
          label: 'Level two 3-2',
        },
      ],
    },
  ]);
</script>

<template>
  <el-tree
    style="max-width: 600px"
    :data="dataSource"
    show-checkbox
    node-key="id"
    default-expand-all
    :expand-on-click-node="false"
  >
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <span v-if="node.id < 5">test1</span>
        <span v-if="node.id > 5">test2</span>
        <span>{{ node.label }}</span>
        <span>
          <a @click="append(data)"> Append </a>
          <a style="margin-left: 8px" @click="remove(node, data)"> Delete </a>
        </span>
      </span>
    </template>
  </el-tree>
</template>

<style scoped lang="scss"></style>
