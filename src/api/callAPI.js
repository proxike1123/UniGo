import {url} from './url';
import axios, * as others from 'axios';
import {getSession} from '../store/store';

const callApi = async (params) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const token = await getSession();

  if (token) {
    myHeaders.append('Authorization', `Bearer ${token}`);
  }

  var raw = JSON.stringify(params.param);

  if (params.method == 'POST' || params.method == 'PUT') {
    var requestOptions = {
      method: params.method,
      headers: myHeaders,
      body: raw,
    };
  } else {
    var requestOptions = {
      method: params.method,
      headers: myHeaders,
    };
  }

  let mergeURL = url + params.command;

  console.log('params', params);

  if (params.username) {
    mergeURL += '/' + params.username;
  }

  if (params.search) {
    mergeURL += '/' + params.search;
  }

  console.log(mergeURL);

  return fetch(mergeURL, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
};

export default callApi;
