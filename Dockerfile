FROM node:16.14-alpine

WORKDIR /app

RUN apk add --no-cache git
RUN apk add curl

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]
RUN npm cache clean --force
RUN npm install
COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "run"]
