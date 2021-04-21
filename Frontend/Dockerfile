# base image 
FROM node:12-alpine

# set working dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install app dependencies
COPY package.json .

#RUN npm install -g npm@lastest
#RUN rm -rf node_modules
RUN npm update & npm cache clean --force
RUN npm install --only=prod --silent

COPY . .

CMD npm start

EXPOSE 3000