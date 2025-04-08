FROM node:22-bullseye

# Dirección de la carpeta donde esta el Dockerfile
WORKDIR /Microservicios/Mostrar_Publicaciones

COPY . .

RUN npm install

EXPOSE 4005

CMD ["npm","start"]