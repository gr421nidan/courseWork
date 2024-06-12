// app/src/store/index.js
import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    role: "",
    userId: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.role === 1,
  },
  mutations: {
    AUTH_SUCCESS: (state, { token, role, userId }) => {
      state.token = token;
      state.role = role;
      state.userId = userId;
      localStorage.setItem("token", token);
    },
    AUTH_ERROR: (state) => {
      state.token = "";
      state.role = "";
      state.userId = null;
      localStorage.removeItem("token");
    },
    LOGOUT: (state) => {
      state.token = "";
      state.role = "";
      state.userId = null;
      localStorage.removeItem("token");
    },
    SET_USER_DATA: (state, { role, userId }) => {
      state.role = role;
      state.userId = userId;
    },
  },
  actions: {
    async login({ commit }, { token, role }) {
      commit("AUTH_SUCCESS", { token, role });
      await this.dispatch("fetchUserData");
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    async fetchUserData({ commit, state }) {
      if (state.token) {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/user/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${state.token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            commit("SET_USER_DATA", { role: data.id_role, userId: data.id });
          } else {
            commit("AUTH_ERROR");
          }
        } catch (error) {
          commit("AUTH_ERROR");
        }
      }
    },
  },
  modules: {},
});
