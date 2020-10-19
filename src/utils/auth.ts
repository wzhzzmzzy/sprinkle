import Cookies from 'js-cookie';
import { useStore } from 'vuex';
import { onMounted, computed } from 'vue';

const TOKEN_KEY = 'nmb-token';

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const initStoreToken = (newToken = '') => {
  onMounted(() => {
    const store = useStore();
    if (!newToken) {
      const userToken = getToken();
      if (userToken) {
        store.commit('user/setToken', userToken);
        return userToken;
      }
      return '';
    }
    setToken(newToken);
    store.commit('user/setToken', newToken);
  });
};

export const hasLogin = () => {
  const store = useStore();
  return computed(() => Boolean(store.state.user.token));
};
