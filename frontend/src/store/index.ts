import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state: {
        user: null,
        token: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        },
    },
    actions: {
        login({ commit }, { token, user }) {
            commit('setToken', token);
            commit('setUser', user);
        },
        logout({ commit }) {
            commit('setToken', null);
            commit('setUser', null);
        },
    },
    getters: {
        isAuthenticated: state => !!state.token,
        getToken: state => state.token,
        getUser: state => state.user,
    },
    plugins: [createPersistedState()],
});
