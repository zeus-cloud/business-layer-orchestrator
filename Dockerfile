FROM node:10

WORKDIR /

COPY package.json ./

RUN npm install

COPY . .

CMD [ "node", "server.js" ]
