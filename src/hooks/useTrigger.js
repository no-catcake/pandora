import _ from 'lodash';
import { ref } from 'vue';

export default function (_triggers) {
  const triggers = _triggers.value;

  const trigger_index = ref(0);
  const trigger_visible = ref(false);

  function editTrigger(index) {
    trigger_visible.value = true;
    trigger_index.value = index;
  }

  function addTrigger() {
    const index = triggers.length;
    const trigger = {
      trigger_base: {
        name: '',
        ignore_miss: false,
        silence_keep: false,
      },
      conditions: [],
    };
    triggers.splice(index, 0, trigger);
    editTrigger(index);
  }

  function deleteTrigger(index) {
    triggers.splice(index, 1);
  }

  function copyTrigger(index) {
    const trigger = _.cloneDeep(triggers[index]);
    trigger.trigger_base.name = trigger.trigger_base.name + ' copy';
    triggers.splice(index + 1, 0, trigger);
  }

  function copyCondition(triggerIndex, conditionIndex) {
    const condition = _.cloneDeep(triggers[triggerIndex].conditions[conditionIndex]);
    condition.name = condition.name + ' copy';
    triggers[triggerIndex].conditions.splice(conditionIndex + 1, 0, condition);
  }

  function addCondition(triggerIndex) {
    const index = triggers[triggerIndex].conditions.length;
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

    triggers[triggerIndex].conditions.splice(index, 0, condition);
  }

  function deleteCondition(triggerIndex, conditionIndex) {
    triggers[triggerIndex].conditions.splice(conditionIndex, 1);
  }

  return {
    trigger_index,
    trigger_visible,
    editTrigger,
    addTrigger,
    copyTrigger,
    deleteTrigger,
    addCondition,
    copyCondition,
    deleteCondition,
  };
}
