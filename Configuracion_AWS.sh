name: Proyecto Octavo

on:
  push:
    branches:
      - main  # Cambia según sea necesario

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      # Checkout the repository code
      - name: Checkout code
        uses: actions/checkout@v3

      # Install Docker and Docker Compose
      - name: Install Docker and Docker Compose
        run: |
          # Actualizar el índice de paquetes
          sudo apt-get update

          # Instalar Docker si no está instalado
          if ! command -v docker &> /dev/null; then
            echo "Docker no encontrado. Instalando..."
            sudo apt-get install -y docker.io
          else
            echo "Docker ya está instalado."
          fi

          # Instalar Docker Compose si no está instalado
          if ! command -v docker-compose &> /dev/null; then
            echo "Docker Compose no encontrado. Instalando..."
            sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
            sudo chmod +x /usr/local/bin/docker-compose
          else
            echo "Docker Compose ya está instalado."
          fi

          # Verificar las versiones de Docker y Docker Compose
          docker --version
          docker-compose --version

      # Log in to Docker Hub
      - name: Log in to DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}  # Asegúrate de que los secretos estén configurados
          password: ${{ secrets.DOCKER_PASSWORD }}
          

      # Build and push Docker images using Docker Compose
      - name: Build and push Docker images with Docker Compose
        run: |
          # Construir las imágenes con Docker Compose
          docker-compose -f docker-compose.yml build

          # Subir las imágenes a Docker Hub
          docker-compose -f docker-compose.yml push





  deploy-to-ec2:
      needs: build-and-push
      runs-on: ubuntu-latest
      steps:
        - name: Trigger redeploy on EC2
          uses: appleboy/ssh-action@master
          with:
            host: ${{ secrets.HOST_DNS }}
            username: ${{ secrets.USERNAME }}
            key: ${{ secrets.EC2_SSH_KEY }}
            script: |
              echo "Conectando a ${{ secrets.HOST_DNS }} para redeploy"


              
              # Descargar las imágenes desde Docker Hub
              docker pull mysql:latest
              docker pull mongo:latest
              docker pull redis:latest
              

              docker pull sebastianwebapp/red_social_estructura_configuracion_perfil:latest
              docker pull sebastianwebapp/red_social_estructura_iniciar_sesion:latest
              docker pull sebastianwebapp/red_social_estructura_mis_habilidades:latest
              docker pull sebastianwebapp/red_social_encriptacion:latest

              docker pull sebastianwebapp/red_social_verificacion_whatsapp:latest
              docker pull sebastianwebapp/red_social_inicio_sesion:latest
              docker pull sebastianwebapp/red_social_jwt:latest
              docker pull sebastianwebapp/red_social_texto_ia:latest
              docker pull sebastianwebapp/red_social_subir_imagen:latest
              docker pull sebastianwebapp/red_social_configuracion_perfil:latest
              docker pull sebastianwebapp/red_social_crear_habilidades:latest
              docker pull sebastianwebapp/red_social_mis_habilidades:latest


              docker pull sebastianwebapp/red_social_crear_publicacion:latest
              docker pull sebastianwebapp/red_social_mostrar_publicaciones:latest
              docker pull sebastianwebapp/red_social_frontend:latest




              # Asegurarse de tener la red y volumen creados
              docker network create app-network || true
              docker volume create mongodb_data || true
              docker volume create mysql_data || true
              docker volume create redis_data || true
          


              # Detener y eliminar contenedores antiguos
              docker stop base_mongoDB || true
              docker rm base_mongoDB || true
              
              docker stop base_mysql || true
              docker rm base_mysql || true

              docker stop redis || true
              docker rm redis || true

             
              docker stop estructura_configuracion_perfil || true
              docker rm estructura_configuracion_perfil || true

              docker stop estructura_iniciar_sesion || true
              docker rm estructura_iniciar_sesion || true

              docker stop estructura_mis_habilidades || true
              docker rm estructura_mis_habilidades || true

       



              docker stop encriptacion || true
              docker rm encriptacion || true

              docker stop verificacion_whatsapp || true
              docker rm verificacion_whatsapp || true

              docker stop inicio_sesion || true
              docker rm inicio_sesion || true

              docker stop jwt || true
              docker rm jwt || true

              docker stop texto_ia || true
              docker rm texto_ia || true

              docker stop subir_imagen || true
              docker rm subir_imagen || true

              docker stop configuracion_perfil || true
              docker rm configuracion_perfil || true

              docker stop crear_habilidades || true
              docker rm crear_habilidades || true

              docker stop mis_habilidades || true
              docker rm mis_habilidades || true

              docker stop crear_publicacion || true
              docker rm crear_publicacion || true

              docker stop mostrar_publicaciones || true
              docker rm mostrar_publicaciones || true

              docker stop frontend || true
              docker rm frontend || true

              


              # Iniciar el contenedor de MongoDB
              docker run -d --name base_mongoDB \
                --network app-network \
                -v mongodb_data:/data/db \
                -p 27017:27017 \
                --restart always \
                mongo:latest

              # Iniciar el contenedor de Mysql
              docker run -d --name base_mysql \
                --network app-network \
                -v mysql_data:/var/lib/mysql \
                -e MYSQL_ROOT_PASSWORD=root \
                -p 3307:3306 \
                --restart always \
                mysql:latest


              # Iniciar el contenedor de Redis
              docker run -d --name redis \
                --network app-network \
                -v redis_data:/data \
                -p 6379:6379 \
                --restart always \
                redis:latest





              # Iniciar el contenedor de estructura_configuracion_perfil
              docker run -d --name estructura_configuracion_perfil \
                --network app-network \
                --restart no \
                -p 4011:4011 \
                sebastianwebapp/red_social_estructura_configuracion_perfil:latest



              # Iniciar el contenedor de estructura_iniciar_sesion
              docker run -d --name estructura_iniciar_sesion \
                --network app-network \
                --restart no \
                -p 4012:4012 \
                sebastianwebapp/red_social_estructura_iniciar_sesion:latest


              # Iniciar el contenedor de estructura_mis_habilidades
              docker run -d --name estructura_mis_habilidades \
                --network app-network \
                --restart no \
                -p 4013:4013 \
                sebastianwebapp/red_social_estructura_mis_habilidades:latest





              # Iniciar el contenedor de encriptacion
              docker run -d --name encriptacion \
                --network app-network \
                --restart always \
                -p 4001:4001 \
                sebastianwebapp/red_social_encriptacion:latest

              
              # Iniciar el contenedor de verificacion_whatsapp
              docker run -d --name verificacion_whatsapp \
                --network app-network \
                --restart always \
                -p 4002:4002 \
                sebastianwebapp/red_social_verificacion_whatsapp:latest


              # Iniciar el contenedor de inicio_sesion
              docker run -d --name inicio_sesion \
                --network app-network \
                --restart always \
                -p 4000:4000 \
                sebastianwebapp/red_social_inicio_sesion:latest

              # Iniciar el contenedor de jwt
              docker run -d --name jwt \
                --network app-network \
                --restart always \
                -p 4003:4003 \
                sebastianwebapp/red_social_jwt:latest

              




              # Iniciar el contenedor de texto_ia
              docker run -d --name texto_ia \
                --network app-network \
                --restart always \
                -p 4004:4004 \
                sebastianwebapp/red_social_texto_ia:latest


              # Iniciar el contenedor de subir_imagen
              docker run -d --name subir_imagen \
                --network app-network \
                --restart always \
                -p 4005:4005 \
                sebastianwebapp/red_social_subir_imagen:latest


              # Iniciar el contenedor de configuracion_perfil
              docker run -d --name configuracion_perfil \
                --network app-network \
                --restart always \
                -p 4006:4006 \
                sebastianwebapp/red_social_configuracion_perfil:latest

              





              # Iniciar el contenedor de crear_habilidades
              docker run -d --name crear_habilidades \
                --network app-network \
                --restart always \
                -p 4007:4007 \
                sebastianwebapp/red_social_crear_habilidades:latest


              # Iniciar el contenedor de mis_habilidades
              docker run -d --name mis_habilidades \
                --network app-network \
                --restart always \
                -p 4008:4008 \
                sebastianwebapp/red_social_mis_habilidades:latest


              # Iniciar el contenedor de crear_publicacion
              docker run -d --name crear_publicacion \
                --network app-network \
                --restart always \
                -p 4009:4009 \
                sebastianwebapp/red_social_crear_publicacion:latest

              
              # Iniciar el contenedor de mostrar_publicaciones
              docker run -d --name mostrar_publicaciones \
                --network app-network \
                --restart always \
                -p 4010:4010 \
                sebastianwebapp/red_social_mostrar_publicaciones:latest


              # Iniciar el contenedor de frontend
              docker run -d --name frontend \
                --network app-network \
                --restart always \
                -p 80:80 \
                sebastianwebapp/red_social_frontend:latest


              echo "Despliegue completado exitosamente"
              docker ps