<script setup>
  import { reactive } from 'vue';

  import layouts from '@/components/Layouts/index.vue';
  import Query from '@/components/Query/index.vue';

  const query_group = reactive({
    name: 'test',
    queries: [
      {
        name: '测试1',
        alias: 'test1',
        query:
          '[{"hostname":"host1","network":"eth0","up":100},{"hostname":"host1","network":"eth1","up":101},{"hostname":"host2","network":"eth0","up":101}]',
        data_source: {
          type: 'JSON',
        },
      },
      {
        name: '测试2',
        alias: 'test2',
        query: '[{"t":" {% for a in test1%}{{a.a}}{{a.b}}{{a.time}}{%endfor%} "}]',
        data_source: {
          type: 'JSON',
        },
      },
      {
        name: '测试3',
        alias: 'test3',
        query: '{{aaa}}{% for b in bb %}{{b}}{% endfor %}',
        data_source: {
          type: 'JSON',
        },
      },
    ],
  });
</script>

<template>
  <layouts title="Global Query" description="Create global query">
    <template #detail>
      <h3>Basic Information</h3>
      Be able to find your monitor easily.
    </template>
    <template #basic_config>
      <el-form-item label="Name">
        <el-input v-model="query_group.name" />
      </el-form-item>
    </template>
    <template #pane>
      <el-tab-pane>
        <template #label>
          <strong>查询</strong>
        </template>
        <query v-model="query_group.queries"></query>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <strong>变量</strong>
        </template>
      </el-tab-pane>
    </template>
  </layouts>
  <!--  <el-form label-width="auto">-->
  <!--    <el-card>-->
  <!--      <h1>Global Query</h1>-->
  <!--      <p>Create global query</p>-->
  <!--      <el-row :gutter="10">-->
  <!--        <el-col :span="8">-->
  <!--          <h3>Basic Information</h3>-->
  <!--          Be able to find your monitor easily.-->
  <!--        </el-col>-->
  <!--        <el-col :span="16">-->
  <!--          <el-card>-->
  <!--            <el-form-item label="Name">-->
  <!--              <el-input v-model="query_group.name" />-->
  <!--            </el-form-item>-->
  <!--          </el-card>-->
  <!--        </el-col>-->
  <!--      </el-row>-->
  <!--      <el-divider/>-->
  <!--        <el-card>-->
  <!--          <el-tabs>-->
  <!--            -->
  <!--          </el-tabs>-->
  <!--        </el-card>-->
  <!--    </el-card>-->
  <!--  </el-form>-->
</template>

<style scoped lang="scss"></style>
