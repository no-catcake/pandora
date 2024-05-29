<script setup>
  import { defineModel, reactive, ref } from 'vue';
  import { CopyDocument, Edit, Loading, Remove, Timer } from '@element-plus/icons-vue';
  import useClipboard from 'vue-clipboard3';
  import { json } from '@codemirror/lang-json';
  import { ElMessage } from 'element-plus';
  import Simplebar from 'simplebar-vue';
  import 'simplebar-vue/dist/simplebar.min.css';
  import { NCode } from 'naive-ui';
  import hljs from 'highlight.js/lib/core';
  import javascript from 'highlight.js/lib/languages/javascript';

  const { toClipboard } = useClipboard();
  hljs.registerLanguage('javascript', javascript);

  import EDialog from '@/components/Dialog/index.vue';
  import VarTree from '@/components/VarTree/index.vue';
  import QueryItem from './query_item.vue';
  import useQuery from '@/hooks/useQuery';
  import { testQuery } from '@/api/query';

  const queries = defineModel();
  const props = defineProps({
    global: {
      type: Boolean,
      default: false,
    },
  });
  const { query_visible, data_sources, copyQuery, addQuery, deleteQuery, query_index, editQuery } =
    useQuery(queries);

  const extensions = [json()];

  const left = ref(null);

  function copyVar(node) {
    let content = '';
    console.log(node.type);
    if (node.type !== 'root' && (node.type === 'object' || node.type === 'list')) {
      content = `{{ ${node.label} }}`;
      console.log(content);
    } else {
      content = node.label;
    }
    toClipboard(content);
    ElMessage.success('复制成功');
  }

  function genTraversal(node) {
    let content = '';
    if (node.type === 'object') {
      content = `{% for ${node.label}_key,${node.label}_value in ${node.label} %}

{% endfor %}`;
    } else if (node.type === 'list') {
      content = `{% for ${node.label}_item in ${node.label} %}

{% endfor %}`;
    } else {
      ElMessage.error('变量无法遍历');
    }
    toClipboard(content);
    ElMessage.success('复制成功');
  }

  const handleTest = async () => {
    testQuery(queries).then((res) => {
      state.icon = res.data;
    });
  };

  const clicked_node = reactive({
    label: '',
    msg: '',
  });

  function treeClick(data, node, item, param) {
    console.log(data);
    clicked_node.label = data.label;
    clicked_node.msg = data.msg;
  }

  const default_query_vars = [
    {
      label: '时间区间变量',
      type: 'list',
      msg: '渲染查询语句中的时间变量',
      code: '',
      children: [
        {
          label: 'timeFilter',
          msg: '{{ timeFilter }} => ',
          type: 'String',
          children: [],
        },
        {
          label: 'timeStart',
          msg: `
{{ timeStart }}渲染为查询的时间区间起点
select * from epimetheus where created_at > {{ timeStart }}
=>
select * from epimetheus where created_at > "2024-01-01 00:00:00"
          `,
          type: 'String',
          children: [],
        },
        {
          label: 'timeEnd',
          msg: `
{{ timeEnd }}渲染为查询的时间区间终点
select * from epimetheus where created_at < {{ timeEnd }}
=>
select * from epimetheus where created_at < "2024-01-01 00:00:00"
f
f
f
f
f
f
f
f
f
f
f
          `,
          type: 'String',
          children: [],
        },
      ],
    },
  ];
</script>

<template>
  <el-card>
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
    <br />
    <el-button style="width: 100%; padding-top: 10px" @click="addQuery"> 新增</el-button>
    <e-dialog v-model="query_visible">
      <template #left>
        <div ref="left">
          <query-item v-model="queries[query_index]" :data_sources="data_sources" :queries="queries"/>
        </div>
      </template>
      <template #right>
        <h4>参数引用</h4>
        <div class="boxed-div">
          <Simplebar>
            <div :hljs="hljs">
              <n-code :code="clicked_node.msg" :language="javascript" word-wrap />
            </div>
            <el-tree
              :data="default_query_vars"
              :expand-on-click-node="false"
              style="max-width: 600px"
              @node-click="(data, node, item, param) => treeClick(data, node, item, param)"
            >
              <template #default="{ node, data }">
                <el-tooltip>
                  <template #content>
                    <span>复制变量</span>
                  </template>
                  <el-icon @click="copyVar(data)">
                    <CopyDocument />
                  </el-icon>
                </el-tooltip>
                <el-tooltip>
                  <template #content>
                    <span>生成遍历语句</span>
                  </template>
                  <el-icon @click="genTraversal(data)">
                    <Loading />
                  </el-icon>
                </el-tooltip>
                <span>{{ node.label }}</span>
              </template>
            </el-tree>
            <!--            <var-tree></var-tree>-->
          </Simplebar>
        </div>
      </template>
    </e-dialog>
  </el-card>
</template>

<style scoped lang="scss">
  .boxed-div {
    //border: 1px solid var(--el-border-color);
    //border-style: dashed;
    padding: 20px;
    margin: 10px;
    //border-radius: 4px;
  }
</style>
