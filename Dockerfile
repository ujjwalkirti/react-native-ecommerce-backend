FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run start

EXPOSE 8080
CMD [ "node", "dist/index.js" ]
