FROM node:20

WORKDIR /usr/src/api

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 8080

CMD ["bash", "entrypoint.sh"]