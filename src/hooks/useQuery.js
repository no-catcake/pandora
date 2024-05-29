import { reactive, ref } from 'vue';

export default function (_queries) {
  const query_index = ref(0);
  const query_visible = ref(false);
  const data_sources = [
    {
      label: 'JSON',
      value: 'JSON',
    },
  ];
  const queries = _queries.value;

  function copyQuery(index) {
    const query = { ...queries[index] };
    query.name = query.name + ' copy';
    query.alias = query.alias + ' copy';
    queries.splice(index + 1, 0, query);
  }

  function addQuery() {
    query_visible.value = true;
    const query = {
      name: '新增查询',
      alias: '',
      query: '',
      data_source: {
        type: '',
      },
    };
    query_index.value = queries.length;
    queries.splice(query_index.value, 0, query);
  }

  function deleteQuery(index) {
    queries.splice(index, 1);
  }

  function editQuery(index) {
    query_visible.value = true;
    query_index.value = index;
  }

  return {
    query_visible,
    data_sources,
    copyQuery,
    addQuery,
    deleteQuery,
    query_index,
    editQuery,
  };
}
