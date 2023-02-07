FROM node:14.21.2

WORKDIR /app

COPY . /app

EXPOSE 3000

CMD ["npm", "install"]
