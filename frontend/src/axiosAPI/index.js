import axios from "axios";
import store from "@/store";

const no_auth_POST = (url, data) => {
  return axios({
    method: "post",
    url: url,
    data: data,
    timeout: 10000,
  });
};

const no_auth_GET = (url) => {
  return axios({
    method: "get",
    url: url,
    timeout: 10000,
  });
};

const auth_POST = (url, data) => {
  const token = store.state.auth.token;
  return axios({
    method: "post",
    url: url,
    data: data,
    timeout: 10000,
    headers: { Authorization: token ? "token " + token : "" },
  });
};
const auth_PATCH = (url, data = {}) => {
  const token = store.state.auth.token;
  return axios({
    method: "patch",
    url: url,
    data: data,
    timeout: 10000,
    headers: { Authorization: token ? "token " + token : "" },
  });
};
const auth_DELETE = (url, data = {}) => {
  const token = store.state.auth.token;
  return axios({
    method: "delete",
    url: url,
    data: data,
    timeout: 10000,
    headers: { Authorization: token ? "token " + token : "" },
  });
};

const auth_GET = (url) => {
  const token = store.state.auth.token;
  return axios({
    method: "get",
    url: url,
    timeout: 10000,
    headers: { Authorization: token ? "token " + token : "" },
  });
};

export {
  no_auth_POST,
  no_auth_GET,
  auth_POST,
  auth_GET,
  auth_PATCH,
  auth_DELETE,
};
