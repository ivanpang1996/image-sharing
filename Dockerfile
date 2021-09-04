FROM openjdk:15-jdk
EXPOSE 8080
#COPY keystore.p12 /etc/keystore.p12
ARG JAR_FILE=backend/build/libs/backend-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} image-sharing.jar
ENTRYPOINT ["java","-jar","/image-sharing.jar"]