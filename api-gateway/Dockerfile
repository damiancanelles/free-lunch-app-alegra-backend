FROM node:latest

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run tsc

CMD ["node", "/home/app/build/index.js"]