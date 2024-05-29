<script setup>
  import EDialog from '@/components/Dialog/index.vue';
  import EItem from '@/components/Grid/item.vue';
  import useTrigger from '@/hooks/useTrigger';
  import { CopyDocument, Edit, Remove } from '@element-plus/icons-vue';
  import { NCollapse, NCollapseItem, NSpace, NPopover } from 'naive-ui';

  const triggers = defineModel();
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
  } = useTrigger(triggers);

  function stopCollapse(e) {
    return e.stopPropagation();
  }
</script>

<template>
  <el-card>
    <el-table :data="triggers" style="width: 100%">
      <el-table-column fixed prop="trigger_base.name" label="Name" width="150" />
      <el-table-column prop="active" label="启用" />
      <el-table-column fixed="right" label="Operations" width="150">
        <template #default="scope">
          <el-button :icon="Edit" circle @click="editTrigger(scope.$index)" />
          <el-button :icon="CopyDocument" circle @click="copyTrigger(scope.$index)" />
          <el-button :icon="Remove" circle @click="deleteTrigger(scope.$index)" />
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-button style="width: 100%; padding-top: 10px" @click="addTrigger"> 新增</el-button>
    <e-dialog v-model="trigger_visible">
      <template #left>
        <el-card>
          <template #header>
            <div class="card-header">
              <span>Basic Information</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Name">
                <el-input v-model="triggers[trigger_index].trigger_base.name" />
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-row>
                <el-checkbox v-model="triggers[trigger_index].trigger_base.ignore_miss"
                  >忽略数据缺失
                </el-checkbox>
              </el-row>
              <el-row>
                <el-checkbox v-model="triggers[trigger_index].trigger_base.silence_keep"
                  >告警恢复后保持静默
                </el-checkbox>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
        <br />
        <el-card>
          <template #header>
            <div class="card-header">
              <span>告警条件</span>
            </div>
          </template>
          <n-collapse :trigger-areas="['main', 'arrow']">
            <n-collapse-item
              v-for="(condition, condition_index) in triggers[trigger_index].conditions"
              hoverable
              :title="condition.name"
              :name="condition_index"
            >
              <template #header-extra>
                <n-space>
                  <n-popover>
                    <template #trigger>
                      <el-button
                        :icon="CopyDocument"
                        circle
                        @click="copyCondition(trigger_index, condition_index)"
                      />
                    </template>
                    <span>复制</span>
                  </n-popover>
                  <n-popover>
                    <template #trigger>
                      <el-button
                        :icon="Remove"
                        circle
                        @click="deleteCondition(trigger_index, condition_index)"
                      />
                    </template>
                    <span>删除</span>
                  </n-popover>
                </n-space>
              </template>
            </n-collapse-item>
          </n-collapse>
          <br />
          <el-button style="width: 100%; padding-top: 10px" @click="addCondition(trigger_index)">
            新增
          </el-button>
        </el-card>
      </template>
      <template #right></template>
    </e-dialog>
  </el-card>
</template>

<style scoped lang="scss"></style>
