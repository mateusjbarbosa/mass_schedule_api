FROM node:latest

WORKDIR /mass_schedule_app

COPY . /mass_schedule_app

RUN npm install 

ENTRYPOINT npm start

EXPOSE 3000