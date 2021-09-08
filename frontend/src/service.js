import axios from "axios";
import userStore from './user-store';

 const baseUrl="http://localhost:3000"
function getHeader() {
  return {
    accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + userStore.getters.getToken
  }
}

function callService(method, url, callback, reqBody, err) {
  let header = {
    headers: getHeader()
  }
  let data = {
    data: reqBody
  }
  let requestParams = [header, data]
  if (method == 'put'||method == 'post') {
    requestParams[0] = reqBody
    requestParams[1] = header
  }
  axios[method](url, requestParams[0],requestParams[1])
    .then(response => {
      if (callback) callback(response)
    })
    .catch(error => {
      if(err) err(error)
      else console.error(error)
    })
}
export function apiService(method, params, callback, reqBody, err) {
  let url = baseUrl + params;
  callService(method, url, callback, JSON.stringify(reqBody), err);
}
export default {
  apiService,
};
