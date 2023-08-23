export const getCookie = (data = {}) => {
  const maxAge = 5 * 60 * 1000; // 5 minutes
  return ['Authorization', data.token, { sameSite: 'Strict', path: '/', secure: true, httpOnly: true, maxAge }];
};
