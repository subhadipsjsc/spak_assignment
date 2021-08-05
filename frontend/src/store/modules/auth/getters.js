export const user_and_token = (state) => {
  return {
    token: state.token,
    user: state.user,
  };
};
export const auth_errors = (state) => {
  return state.error;
};
