FROM node:18.14.2-alpine3.17

WORKDIR /todo-api-example/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8010

CMD [ "node", "app.js" ]