FROM mysql:latest

WORKDIR /mass_schedule_app
VOLUME [ "/data" ]

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=mass_schedule_database

EXPOSE 3306