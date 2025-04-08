FROM node:22-bullseye

# Dirección de la carpeta donde esta el Dockerfile
WORKDIR /Microservicios/Jwt

COPY . .

RUN npm install

EXPOSE 4003

CMD ["npm","start"]