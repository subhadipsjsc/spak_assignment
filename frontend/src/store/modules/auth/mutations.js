export const SET_USER = (state, user) => {
  localStorage.setItem("user", JSON.stringify(user));
  state.user = { ...user };
};

export const SET_TOKEN = (state, token) => {
  const now = Date.now() / 1000;
  const JWT_expiration = now + 60 * 60;
  localStorage.setItem("token", token);
  localStorage.setItem("tokenExpireTime", JWT_expiration);
  state.token = token;
};

export const SET_USER_VERIFIED = (state, status) => {
  const newUserData = { ...state.user, isVerified: status };
  localStorage.setItem("user", JSON.stringify(newUserData));
  state.user = newUserData;
};

export const LOGOUT = (state) => {
  localStorage.setItem("user", "");
  localStorage.setItem("token", "");
  localStorage.setItem("tokenExpireTime", "");
  state.token = "";
  state.user = null;
};
