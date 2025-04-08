FROM node:22-bullseye

# Dirección de la carpeta donde esta el Dockerfile
WORKDIR /Microservicios/Estructura_Configuracion_Perfil

COPY . .

RUN npm install

EXPOSE 4011

CMD ["npm","start"]