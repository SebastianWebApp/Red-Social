# Etapa 1: Builder
FROM golang:1.20-alpine AS builder

# Instalar dependencias necesarias
RUN apk add --no-cache git

# Configurar el directorio de trabajo
WORKDIR /Microservicios/Crear_Habilidades

# Copiar los archivos necesarios
COPY go.mod go.sum /Microservicios/Crear_Habilidades/

# Descargar dependencias
RUN go mod tidy

# Copiar todo el código fuente desde la raíz
COPY . .

# Compilar el código en un binario llamado 'app'
RUN go build -o app .

# Etapa 2: Runtime
FROM alpine:latest

# Instalar dependencias necesarias para ejecutar la aplicación (incluyendo MariaDB client)
RUN apk --no-cache add ca-certificates mariadb-client

# Configurar el directorio de trabajo
WORKDIR /Microservicios/Crear_Habilidades

# Copiar el binario compilado y los archivos requeridos desde la etapa de compilación
COPY --from=builder /Microservicios/Crear_Habilidades/app .
COPY --from=builder /Microservicios/Crear_Habilidades/.env .

# Exponer el puerto que usará la aplicación
EXPOSE 4007

# Comando por defecto para ejecutar la aplicación
CMD ["./app"]
