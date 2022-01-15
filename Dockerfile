FROM node:latest

WORKDIR /usr/app

COPY package.json ./

#RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]

#ENTRYPOINT ["bash","entrypoint.prod.sh"]