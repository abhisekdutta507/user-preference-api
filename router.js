import { Router } from 'express';
import { URL } from './api/constant/url.js';
import * as userMiddleware from './api/middleware/user.js';
import * as authController from './api/controller/auth.js';
import * as userController from './api/controller/user.js';

export const router = () => {
  const router = Router({ caseSensitive: true });

  router.post(URL.login, authController.login);
  router.post(URL.signup, authController.signup);

  // user end-points
  router.get(URL.users.byId, userMiddleware.idInToken, userController.findOne);
  router.put(URL.users.byId, userMiddleware.idInToken, userController.updateOne);

  return router;
};
