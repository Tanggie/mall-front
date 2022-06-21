let baseURL;
switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = 'http://localhost:8887/csu_super_mall/api';
    break;
  case 'test':
    baseURL = 'http://localhost:8887/csu_super_mall/';
    break;
  case 'prev':
    baseURL = 'http://prev-mall-pre.springboot.cn/api';
    break;
  case 'prod':
    baseURL = 'http://dev-mall-pre.springboot.cn/api/';
    break;
  default:
    baseURL = 'http://localhost:8887/csu_super_mall/';
    break;
}

export default {
  baseURL
}