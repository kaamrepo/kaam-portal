import axios from 'axios';
import useLoginStore from '../store/login.store';

const API = axios.create({
  headers: {
    'Content-Type': 'application/json',
    // timezone: getTimeZone(),
  },
});

//interceptor which calls custom enable loader function when the request is sent through axios
API.interceptors.request.use(async request => {
  
    useLoginStore.getState().setLoaderState(true);
  return request;
});

//interceptor which calls custom disable loader function when the response is received.
API.interceptors.response.use(
  async response => {
    useLoginStore.getState().setLoaderState(false);
    return response;
  },
  async error => {
    useLoginStore.getState().setLoaderState(false);
    throw error;
  },
);

export default API;
