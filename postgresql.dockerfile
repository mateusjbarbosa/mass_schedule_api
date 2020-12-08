FROM postgres:latest

WORKDIR /mass_schedule_app
VOLUME [ "/data" ]

ENV POSTGRES_PASSWORD=root
ENV POSTGRES_DB=mass_schedule_database

EXPOSE 5432