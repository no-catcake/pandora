<script setup xmlns:el-="http://www.w3.org/1999/html">
  import Query from '@/components/Query/index.vue';
  import Trigger from '@/components/Trigger/index.vue';
  import { json } from '@codemirror/lang-json';
  import { oneDark } from '@codemirror/theme-one-dark';
  import useRule from '@/hooks/useRule';
  import useTrigger from '@/hooks/useTrigger';
  import { CopyDocument, Edit, Remove } from '@element-plus/icons-vue';
  import { NAnchor } from 'naive-ui';

  const { rule } = useRule();

  const {
    trigger_index,
    trigger_visible,
    editTrigger,
    addTrigger,
    copyTrigger,
    deleteTrigger,
    addCondition,
    copyCondition,
    deleteCondition,
  } = useTrigger(rule.triggers);

  const extensions = [json(), oneDark];
</script>

<template>
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
          <el-card>
            <el-form-item label="Name">
              <el-input v-model="rule.name" />
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="调度方式">
                  <el-radio-group v-model="rule.frequency.type">
                    <el-radio-button :label="0" border>Cron</el-radio-button>
                    <el-radio-button :label="1" border>固定周期</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-alert
                  title="最小粒度为分钟, 同一分钟内执行的规则会均匀的打散到秒级执行"
                  type="info"
                  :closable="false"
                />
              </el-col>
            </el-row>
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
          </el-card>
        </el-col>
      </el-row>
      <el-divider />
      <el-card>
        <el-tabs tabPosition="left">
          <el-tab-pane>
            <template #label>
              <strong>查询</strong>
            </template>
            <query v-model="rule.queries"></query>
          </el-tab-pane>
          <el-tab-pane>
            <template #label>
              <strong>触发器</strong>
            </template>
            <trigger v-model="rule.triggers"></trigger>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-card>
  </el-form>
</template>

<style scoped lang="scss"></style>
