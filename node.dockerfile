FROM node:latest

WORKDIR /mass_schedule_app

COPY . /mass_schedule_app

RUN npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait 

CMD /wait && npm start