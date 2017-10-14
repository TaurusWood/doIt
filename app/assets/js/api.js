import axios from 'axios';
import bus from './bus';

const baseConf = {
  baseURL: '', // 到时候根据生产环境判断
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  timeout: 3000,
  validateStatus: function (status) {
    return status !== 400 && status < 500;
  }
}

const errorHandle = function (message) {
  bus.$Message.error(message);
}

const AjaxCb = function (res) {
  if (noErrhandle) {
    return res;
  }
  if (res.code <= 0) {
    errorHandle(res.message);
    return false;
  }
  return res;
}

class API {
  get(url, param, noErrhandle) {
    return axios.get(url, param, baseConf)
    .then(AjaxCb(res))
    .catch(err => errorHandle(err.response.data.message || '请求参数有误'))
  }

  post(url, param, noErrhandle) {
    return axios.post(url, param, Object.assign(baseConf, {
      'Content-Type': 'application/x-www-form-urlencoded'
    })).then(res => AjaxCb(res))
    .catch(err => errorHandle(err.response.data.message || '请求参数有误'))
  }

  put(url, param, noErrhandle) {
    return axios.put(url, param, baseConf)
    .then(AjaxCb(res))
    .catch(err => errorHandle(err.response.data.message || '请求参数有误'))
  }
}

export default API;
