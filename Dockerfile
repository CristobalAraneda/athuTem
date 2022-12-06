FROM node:14

WORKDIR /home/app

COPY package*.json ./

RUN npm install
RUN npm i -g nodemon

COPY . .

EXPOSE 3000

CMD ["nodemon", "index.js"]