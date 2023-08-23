FROM node:18.17.1-alpine3.18

WORKDIR /project/user-preference-api
COPY *.json ./

RUN npm install --silent

COPY *.js ./
COPY ./api ./api

ENV PORT=3001
EXPOSE ${PORT}

CMD ["npm", "start"]