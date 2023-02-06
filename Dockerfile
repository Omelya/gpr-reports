FROM node:19.2.0

WORKDIR /app

COPY . /app

RUN cd /app npm install

EXPOSE 3000

CMD ["npm", "start"]