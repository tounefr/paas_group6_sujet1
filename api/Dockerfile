FROM node:8.16.2-jessie

WORKDIR /app

COPY package.json ./
RUN npm install
COPY . .

CMD [ "npm", "start" ]
