import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || "",
    userId: localStorage.getItem("userId") || "",
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.role === "1",
    getUserId: (state) => state.userId,
  },
  mutations: {
    AUTH_SUCCESS: (state, { token, role, userId }) => {
      state.token = token;
      state.role = role;
      state.userId = userId;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
    },
    AUTH_ERROR: (state) => {
      state.token = "";
      state.role = "";
      state.userId = "";
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
    },
    LOGOUT: (state) => {
      state.token = "";
      state.role = "";
      state.userId = "";
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
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
