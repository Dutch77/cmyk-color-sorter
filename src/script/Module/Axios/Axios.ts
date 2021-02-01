import axios from 'axios';

export const create = () => {
  return axios.create({
    // baseURL, // todo: do I need this?
    // headers: { // todo: do I need token with external endpoint?
    //   Authorization: accessToken,
    // },
  });
};

export const register = async ({}: {}) => {
  return {
    axios: create(),
  };
};
