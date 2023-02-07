FROM node:14.21.2

WORKDIR /app

COPY . /app

RUN cd /app npm install

EXPOSE 3000

CMD ["npm", "install"]
