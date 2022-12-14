FROM node:19.2.0

WORKDIR /app

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]