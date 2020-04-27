FROM crud2:latest

RUN cd
RUN cd /root/crud
RUN /etc/init.d/mysql stop

RUN mysqld_safe --skip-grant-tables &

EXPOSE 8080

CMD ["node","index.js"]

