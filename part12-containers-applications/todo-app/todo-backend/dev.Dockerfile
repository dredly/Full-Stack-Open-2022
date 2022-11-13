FROM node:16.18.0-bullseye-slim

WORKDIR /usr/src/app

RUN npm install -g nodemon

COPY --chown=node:node . .

RUN npm install

USER node

CMD ["nodemon", "./src/bin/www"]
