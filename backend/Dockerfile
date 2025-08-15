FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY target/foodordering-0.0.1-SNAPSHOT.jar foodordering-v1.jar
RUN mvn clean package -DskipTests
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "foodordering-v1.jar"]