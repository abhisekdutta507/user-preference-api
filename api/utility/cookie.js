export const getCookie = (data = {}) => {
  return ['Authorization', data.token, { secure: true, httpOnly: true }];
};
