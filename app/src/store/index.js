import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    role: [],
    userId: "",
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.role.includes(1),
    getUserId: (state) => state.userId,
  },
  mutations: {
    AUTH_SUCCESS: (state, { token, role, userId }) => {
      state.token = token;
      state.role = Array.isArray(role) ? role : [role];
      state.userId = userId;
      localStorage.setItem("token", token);
    },
    AUTH_ERROR: (state) => {
      state.token = "";
      state.role = [];
      state.userId = "";
      localStorage.removeItem("token");
    },
    LOGOUT: (state) => {
      state.token = "";
      state.role = [];
      state.userId = "";
      localStorage.removeItem("token");
    },
  },
  actions: {
    login({ commit }, { token, role, userId }) {
      commit("AUTH_SUCCESS", { token, role: parseInt(role), userId });
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
  },
  modules: {},
});
