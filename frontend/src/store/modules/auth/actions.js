import { no_auth_POST } from "@/axiosAPI";
import CONFIG from "@/config.js";

export const loginAction = async (context, data) => {
  try {
    const resData = await no_auth_POST(`${CONFIG.backendURL}/user/login`, data);
    console.log(resData);
    if (resData.status == 200 && resData.statusText == "OK") {
      //---- if user is not verified ------
      if (
        resData.data.success == 0 &&
        resData.data.message == "please verify account"
      ) {
        localStorage.setItem("user", JSON.stringify(resData.data.user));
        context.commit("SET_USER", resData.data.user);
      }
      //---- if user is verified and login successful------
      else if (
        resData.data.success == 1 &&
        resData.data.message == "login successful"
      ) {
        context.commit("SET_USER", resData.data.user);
        context.commit("SET_TOKEN", resData.data.token);
      }
    }
  } catch (err) {
    context.commit("SET_USER", null);
    context.commit("SET_TOKEN", "");
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
