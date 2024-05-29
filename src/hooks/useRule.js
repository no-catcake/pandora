import { reactive, ref } from 'vue';
import _ from 'lodash';

export default function () {
  const rule = reactive({
    name: 'test',
    frequency: {
      type: 0,
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

  const query_index = ref(0);
  const query = reactive({
    name: '',
    alias: '',
    query: '',
    data_source: {
      type: '',
    },
  });

  return {
    rule,
    addTrigger,
    deleteTrigger,
    copyTrigger,
    copyCondition,
    addCondition,
    deleteCondition,
  };
}
