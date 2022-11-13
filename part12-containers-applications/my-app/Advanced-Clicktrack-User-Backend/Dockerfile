FROM node:16.18.0-bullseye-slim

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

USER node

CMD ["node", "build/src/index.js"]


