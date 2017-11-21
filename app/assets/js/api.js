import axios from 'axios';
import Qs from 'qs';
import bus from './bus';

const baseConf = {
  baseURL: '', // 到时候根据生产环境判断
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Access-Token': window.localStorage.getItem('token')
  },
  timeout: 3000,
  transformRequest: [
		function(data) {
			//由于使用的form-data传数据所以要格式化
			return Qs.stringify(data);
		}
	],
  // paramsSerializer: function(params) {
  // 	return Qs.stringify(params)
  // },
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认的
  },
}

const errorHandle = function (message) {
  bus.$Message.error(message);
}

const ajaxCb = function (res, noErrhandle) {
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
  updateToken() {
    axios.defaults.headers.common['X-Access-Token'] = window.localStorage.getItem('token');
  }

  get(url, param, noErrhandle) {
    return axios.get(url, param, baseConf)
    .then(res => ajaxCb(res.data, noErrhandle))
    .catch(err => errorHandle(err.response.data.message))
  }

  post(url, param, noErrhandle) {
    return axios.post(url, param, Object.assign(baseConf, {
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded',
      //   'X-Requested-With': 'XMLHttpRequest'
      // }
    })).then(res => ajaxCb(res.data, noErrhandle))
    .catch(err => errorHandle(err.response.data.message))
  }

  put(url, param, noErrhandle) {
    return axios.put(url, param, baseConf)
    .then(res => ajaxCb(res.data, noErrhandle))
    .catch(err => errorHandle(err.response.data.message))
  }
}

export default API;
