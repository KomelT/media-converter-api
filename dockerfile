FROM node:18.17.0

RUN apt-get update

RUN apt-get install dcraw libraw-bin -y

WORKDIR /var/app

COPY package.json package-lock.json ./

RUN npm i

RUN npm run build

EXPOSE 80

CMD [ "npm", "run", "start" ]