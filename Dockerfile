FROM node:13

WORKDIR /

COPY static /static
COPY package.json /
COPY server.js /

RUN npm install

CMD ["node", "server.js"]
