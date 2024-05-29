import request from '@/utils/request.js';

export const testQuery = (data) => {
  console.log(data);
  return request({
    url: '/query/test',
    method: 'post',
    data,
  });
};
