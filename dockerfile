FROM debian:latest
ENV DEBIAN_FRONTEND=noninteractive
RUN cd /tmp
RUN apt-get update && apt-get install -y apt-utils && apt-get install -y wget
RUN apt-get install -y lsb-release && apt-get install -y gnupg 
RUN cd /tmp
ENV DEBIAN_FRONTEND=noninteractive
RUN wget http://repo.mysql.com/mysql-apt-config_0.8.13-1_all.deb
RUN dpkg -i mysql-apt-config_0.8.13-1_all.deb
RUN apt-get update && apt-get install -y mysql-server
RUN apt-get install -y nodejs && apt-get install -y npm

COPY nodejs/ /root/crud
RUN cd /root/crud
RUN npm install

RUN mysqld_safe & 
CMD ["mysql -u root < /root/crud/database.sql"]
RUN mysql --version
EXPOSE 3306
CMD ["npm","install"]
CMD ["node","/root/crud/service.js"]
EXPOSE 8080

