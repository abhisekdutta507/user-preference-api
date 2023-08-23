export const getCookie = (data = {}) => {
  const maxAge = 5 * 60 * 1000; // 5 minutes
  return ['Authorization', data.token, { domain: 'user-preference-ui.netlify.app', sameSite: 'None', path: '/', secure: true, httpOnly: true, maxAge }];
};
