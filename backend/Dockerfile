# development
FROM node:16 AS development

WORKDIR /souilmi/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

# production
FROM node:16 AS production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /souilmi/src/app

COPY --from=development /souilmi/src/app .

EXPOSE 8080

CMD ["node","dist/main"]