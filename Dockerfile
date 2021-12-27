FROM node:14 AS Production

ENV NODE_ENV=Production

WORKDIR /usr/src/client

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]