FROM node:22-bullseye

# Dirección de la carpeta donde esta el Dockerfile
WORKDIR /Frontend

COPY . .

RUN npm install

EXPOSE 80

CMD ["npm","start"]