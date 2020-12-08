FROM node:15.3.0-alpine

WORKDIR /mass_schedule_app

COPY . /mass_schedule_app

RUN npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait 

ENV WAIT_HOSTS=postgresql:5432
ENV WAIT_SLEEP_INTERVAL=10
ENV WAIT_HOSTS_TIMEOUT=120

CMD /wait && npm start