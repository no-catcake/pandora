<script setup>
  import { Timer } from '@element-plus/icons-vue';
  import { Codemirror } from 'vue-codemirror';
  import { json } from '@codemirror/lang-json';
  import { reactive, ref } from 'vue';

  import EData from './data.vue';
  import { testQuery } from '@/api/query';

  const query = defineModel();
  const props = defineProps(['data_sources', 'queries']);
  const extensions = [json()];
  const query_range = reactive({
    time_start: '-1h',
    time_end: 'now',
  });

  const queries = reactive(props.queries);

  const query_data = ref(null);
  const data_visible = ref(false);

  const handleTest = async () => {
    const alias = query.value.alias;
    const data = {
      queries: queries,
      range: {
        from: query_range.time_start,
        to: query_range.time_end,
      },
      query_alias: alias,
    };
    testQuery(data).then((res) => {
      query_data.value = res.data;
    });
    data_visible.value = true;
  };
</script>

<template>
  <el-form label-width="auto">
    <el-form-item label="Name">
      <el-input v-model="query.name"></el-input>
    </el-form-item>
    <el-form-item label="引用别名">
      <el-input v-model="query.alias"></el-input>
    </el-form-item>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-form-item label="数据源配置">
          <el-select v-model="query.data_source.type">
            <el-option
              v-for="data_source in data_sources"
              :key="data_source.value"
              :label="data_source.label"
              :value="data_source.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="查询语句">
      <codemirror
        v-model="query.query"
        placeholder="Code here..."
        :style="{ width: '100%', height: '400px' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
      />
    </el-form-item>
    <el-form-item label="时间区间">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input :prefix-icon="Timer" placeholder="TimeStart" v-model="query_range.time_start" />
        </el-col>
        <el-col :span="2"> To</el-col>
        <el-col :span="6">
          <el-input :prefix-icon="Timer" placeholder="TimeEnd" v-model="query_range.time_end" />
        </el-col>
        <el-col :span="4">
          <el-button @click="handleTest">运行查询</el-button>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
  <el-dialog v-model="data_visible">
    <e-data :data="query_data" />
  </el-dialog>
</template>

<style scoped lang="scss"></style>
