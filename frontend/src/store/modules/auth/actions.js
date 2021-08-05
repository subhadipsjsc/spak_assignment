import { no_auth_POST } from "@/axiosAPI";
import CONFIG from "@/config.js";

export const signupAction = async (context, data) => {
  try {
    const resData = await no_auth_POST(
      `${CONFIG.backendURL}/user/create/`,
      data
    );
    console.log(resData);
    if (resData.status == 200 && resData.statusText == "OK") {
      //---- if user is not verified ------
      if (resData.data.success == 1) {
        resData.data.user.userId = resData.data.user._id;
        delete resData.data.user._id;
        console.log(resData.data.user);
        context.commit("SET_USER", resData.data.user);
        context.commit("SET_TOKEN", "");
      }
    }
  } catch (err) {
    context.commit("SET_USER", null);
    context.commit("SET_TOKEN", "");
  }
};

export const loginAction = async (context, data) => {
  try {
    const resData = await no_auth_POST(`${CONFIG.backendURL}/user/login`, data);
    console.log(resData);
    if (resData.status == 200 && resData.statusText == "OK") {
      //---- if user is not verified ------
      if (
        resData.data.success == 1 &&
        resData.data.message == "please verify account"
      ) {
        context.commit("SET_USER", resData.data.user);
        context.commit("SET_ERROR", "");
      }
      //---- if user is verified and login successful------
      else if (
        resData.data.success == 1 &&
        resData.data.message == "login successful"
      ) {
        context.commit("SET_USER", resData.data.user);
        context.commit("SET_TOKEN", resData.data.token);
        context.commit("SET_ERROR", "");
      } else {
        context.commit("SET_USER", null);
        context.commit("SET_TOKEN", "");
        context.commit("SET_ERROR", "Email or Password wrong");
      }
    } else {
      context.commit("SET_USER", null);
      context.commit("SET_TOKEN", "");
      context.commit("SET_ERROR", "Email or Password wrong");
    }
  } catch (err) {
    context.commit("SET_USER", null);
    context.commit("SET_TOKEN", "");
    context.commit("SET_ERROR", "Email or Password wrong");
  }
};

export const verifyAccountAction = async (context, data) => {
  try {
    const resData = await no_auth_POST(
      `${CONFIG.backendURL}/user/verify-account`,
      data
    );
    if (
      resData.status == 200 &&
      resData.statusText == "OK" &&
      resData.data.success == 1 &&
      resData.data.status == "verified"
    ) {
      context.commit("SET_USER_VERIFIED", true);
    } else {
      context.commit("SET_USER_VERIFIED", false);
    }
  } catch (err) {
    context.commit("SET_USER_VERIFIED", false);
  }
};
