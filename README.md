The application opens by default on [http://localhost:3001](http://localhost:3001)

**Run the application in development mode.** 

```bash
npm run dev
```

**Run the application in production mode.**

```bash
npm start
```

**`Signup` API is documented below.**

```js
const body = {
  username: 'username',
  password: 'password',
  preference: {}
};
const headers = new Headers();
try {
  await axios.post(`https://user-preference-api-6f803dd8c244.herokuapp.com/api/v1/signup`, body, { withCredentials: true, headers });
} catch(e) {
  // ...
}
```

**`Login` API is documented below.**

```js
const body = {
  username: 'username',
  password: 'password'
};
const headers = new Headers();
try {
  await axios.post(`https://user-preference-api-6f803dd8c244.herokuapp.com/api/v1/login`, body, { withCredentials: true, headers });
} catch(e) {
  // ...
}
```

**`getUser` API is documented below.**

```js
const headers = new Headers();
try {
  await axios.get(`https://user-preference-api-6f803dd8c244.herokuapp.com/api/v1/users/:_id`, { withCredentials: true, headers });
} catch(e) {
  // ...
}
```

**`updateUser` API is documented below.**

```js
const headers = new Headers();
const docs = {
  preference: 'sunny'
};
try {
  await axios.put(`https://user-preference-api-6f803dd8c244.herokuapp.com/api/v1/users/:_id`, docs, { withCredentials: true, headers });
} catch(e) {
  // ...
}
```

**Policies on the GET and PUT endpoints**

Policies can be applied [here](./router.js).

```js
import * as userMiddleware from './api/middleware/user.js';

export const router = () => {
  const router = Router({ caseSensitive: true });

  // user end-points
  router.get(URL.users.byId, userMiddleware.idInToken, userController.findOne);
  router.put(URL.users.byId, userMiddleware.idInToken, userController.updateOne);

  return router;
};
```

The idInToken policy will verify the Auth token & the _id in param must be equal to the _id in token.

**Note:** **HttpOnly** cookies only work under same domain. So, client & server must be deployed over same domain.
