FROM debian:latest

RUN cd
RUN apt-get update && apt-get install -y wget
RUN wget https://dev.mysql.com/get/mysql-apt-config_0.8.13-1_all.deb
RUN dpkg -i mysql-apt-config_0.8.13-1_all.deb
RUN apt-get update
RUN apt-get install -y mysql-server && apt-get install -y nodejs && apt-get install -y npm

COPY nodejs/ /root/crud

RUN cd /root/crud
RUN npm install

RUN /etc/init.d/mysql stop

RUN mysqld_safe --skip-grant-tables &

RUN mysql < database.sql

EXPOSE 8080

CMD ["node","service.js"]


