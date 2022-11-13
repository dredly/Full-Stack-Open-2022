FROM node:16.18.0-bullseye-slim

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

USER node

CMD ["node", "./src/bin/www"]