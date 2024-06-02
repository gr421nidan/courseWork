import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("access_token") || "",
    role: localStorage.getItem("id_role") || "",
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.role === "1",
  },
  mutations: {
    AUTH_SUCCESS: (state, { token, role }) => {
      state.token = token;
      state.userRoles = role;
    },
    AUTH_ERROR: (state) => {
      state.token = "";
      state.userRoles = [];
    },
    LOGOUT: (state) => {
      state.token = "";
      state.userRoles = [];
    },
  },
  actions: {
    login({ commit }, { token, role }) {
      commit("AUTH_SUCCESS", { token, role });
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
  },
  modules: {},
});
