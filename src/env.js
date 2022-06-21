let baseURL;
switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = 'http://localhost:8887/csu_super_mall/';
    break;
  case 'test':
    baseURL = 'http://localhost:8887/csu_super_mall/';
    break;
  case 'prev':
    baseURL = 'http://localhost:8887/csu_super_mall/';
    break;
  case 'prod':
    baseURL = 'http://localhost:8887/csu_super_mall/';
    break;
  default:
    baseURL = 'http://localhost:8887/csu_super_mall/';
    break;
}

export default {
  baseURL
}
