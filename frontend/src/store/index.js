import { createStore } from "vuex";
import auth from "./modules/auth";
import list from "./modules/lists";
export default createStore({
  modules: {
    auth,
    list,
  },
});
