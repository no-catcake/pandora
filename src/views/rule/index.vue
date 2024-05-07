<script setup>
  import { reactive } from 'vue';
  import { Codemirror } from 'vue-codemirror';
  import { json } from '@codemirror/lang-json';
  import { oneDark } from '@codemirror/theme-one-dark';
  import _ from 'lodash';

  const rule = reactive({
    name: 'test',
    frequency: {
      type: '0',
      cron: '* * * * *',
      occur: 2,
      silence: '1h',
    },
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
    triggers: [
      {
        trigger_base: {
          name: 'trigger1',
          ignore_miss: false,
          silence_keep: false,
        },
        conditions: [
          {
            name: 'test',
            metric: 'a',
            series_range: {
              range: {
                from: '-30m',
                to: 'now',
              },
              query_alias: 'test1',
            },
            group_by: ['hostname', 'network'],
            specify_threshold: [
              {
                feature_dimension: [
                  {
                    type: 0,
                    dimension: 'hostname',
                    eigenvalue: 'host1',
                  },
                  {
                    type: 0,
                    dimension: 'network',
                    eigenvalue: 'eth0',
                  },
                ],
                evaluator: {
                  type: 'threshold',
                  method: 'gt',
                  threshold: 17,
                },
              },
            ],
            reducer: {
              type: 'avg',
              interval: 0,
            },
            evaluator: {
              type: 'threshold',
              method: 'gt',
              threshold: 10,
            },
          },
          {
            name: 'test',
            metric: 'a',
            series_range: {
              range: {
                from: '-40m',
                to: 'now',
              },
              query_alias: 'test1',
            },
            group_by: ['hostname', 'network'],
            specify_threshold: [
              {
                feature_dimension: [
                  {
                    type: 0,
                    dimension: 'hostname',
                    eigenvalue: 'test1',
                  },
                  {
                    type: 0,
                    dimension: 'network',
                    eigenvalue: 'eth0',
                  },
                ],
                evaluator: {
                  type: 'threshold',
                  method: 'gt',
                  threshold: 10,
                },
              },
            ],
            reducer: {
              type: 'avg',
              interval: 0,
            },
            evaluator: {
              type: 'threshold',
              method: 'gt',
              threshold: 22,
            },
          },
        ],
      },
    ],
  });

  const query_alias = rule.queries.map(function (item) {
    return { label: item.name, value: item.alias };
  });

  const extensions = [json(), oneDark];

  const data_sources = [
    {
      label: 'JSON',
      value: 'JSON',
    },
  ];

  function addTrigger(index) {
    const trigger = {
      trigger_base: {
        name: '',
        ignore_miss: false,
        silence_keep: false,
      },
      conditions: [],
    };
    rule.triggers.splice(index + 1, 0, trigger);
  }

  function deleteTrigger(index) {
    rule.triggers.splice(index, 1);
  }

  function copyTrigger(index) {
    const trigger = _.cloneDeep(rule.triggers[index]);
    trigger.trigger_base.name = trigger.trigger_base.name + ' copy';
    rule.triggers.splice(index + 1, 0, trigger);
  }

  function copyQuery(index) {
    const query = { ...rule.queries[index] };
    query.name = query.name + ' copy';
    query.alias = query.alias + ' copy';
    rule.queries.splice(index + 1, 0, query);
  }

  function addQuery(index) {
    const query = {
      name: '',
      alias: '',
      query: '',
      data_source: {
        type: '',
      },
    };
    rule.queries.splice(index + 1, 0, query);
  }

  function deleteQuery(index) {
    rule.queries.splice(index, 1);
  }

  function copyCondition(triggerIndex, conditionIndex) {
    const condition = _.cloneDeep(rule.triggers[triggerIndex].conditions[conditionIndex]);
    condition.name = condition.name + ' copy';
    rule.triggers[triggerIndex].conditions.splice(conditionIndex + 1, 0, condition);
  }

  function addCondition(triggerIndex, conditionIndex) {
    const condition = {
      name: 'test',
      metric: 'a',
      series_range: {
        range: {
          from: '-30m',
          to: 'now',
        },
        query_alias: 'test1',
      },
      group_by: ['hostname', 'network'],
      specify_threshold: [
        {
          feature_dimension: [
            {
              type: 0,
              dimension: 'hostname',
              eigenvalue: 'host1',
            },
            {
              type: 0,
              dimension: 'network',
              eigenvalue: 'eth0',
            },
          ],
          evaluator: {
            type: 'threshold',
            method: 'gt',
            threshold: 17,
          },
        },
      ],
      reducer: {
        type: 'avg',
        interval: 0,
      },
      evaluator: {
        type: 'threshold',
        method: 'gt',
        threshold: 10,
      },
    };

    rule.triggers[triggerIndex].conditions.splice(conditionIndex + 1, 0, condition);
  }

  function deleteCondition(triggerIndex, conditionIndex) {
    rule.triggers[triggerIndex].conditions.splice(conditionIndex, 1);
  }
</script>

<template>
  {{ rule }}
  <el-form label-width="auto">
    <el-card>
      <h1>Monitor</h1>
      <p>Create your monitor</p>
      <el-row :gutter="10">
        <el-col :span="8">
          <h3>Basic Information</h3>
          Be able to find your monitor easily.
        </el-col>
        <el-col :span="16">
          <el-form-item label="Name">
            <el-input v-model="rule.name" />
          </el-form-item>
          <el-form-item label="调度方式">
            <el-radio-group v-model="rule.frequency.type">
              <el-radio-button :label="0" border>Cron</el-radio-button>
              <el-radio-button :label="1" border>固定周期</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-row :gutter="10" v-if="rule.frequency.type === 0">
            <el-col :span="8">
              <el-form-item label="Cron">
                <el-input v-model="rule.frequency.cron" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="连续触发">
                <el-input v-model="rule.frequency.occur" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="静默时间">
                <el-input v-model="rule.frequency.silence" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-tabs>
        <el-tab-pane label="查询">
          <el-card>
            <template #header>
              <el-button @click="addQuery">新增</el-button>
            </template>
            <el-collapse>
              <el-collapse-item v-for="(query, index) in rule.queries" :name="index">
                <template #title>
                  {{ query.name }}
                </template>
                <el-card>
                  {{ query.query }}
                </el-card>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </el-form>
</template>

<style scoped lang="scss"></style>
