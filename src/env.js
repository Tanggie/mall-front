let baseURL;
switch (process.env.NODE_ENV) {
  case 'development':

    baseURL = 'http://106.55.173.219:10034/csu_super_mall/';

    break;
  case 'test':
    baseURL = 'http://106.55.173.219:10034/csu_super_mall/';
    break;
  case 'prev':

    baseURL = 'http://106.55.173.219:10034/csu_super_mall/';
    break;
  case 'prod':
    baseURL = 'http://106.55.173.219:10034/csu_super_mall/';

    break;
  default:
    baseURL = 'http://106.55.173.219:10034/csu_super_mall/';
    break;
}

export default {
  baseURL
}
