FROM openjdk:17-jdk-slim
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

RUN chmod +x ./mvnw


RUN ./mvnw dependency:go-offline -B

COPY src ./src

RUN ./mvnw clean package -DskipTests

EXPOSE 8080

RUN addgroup --system spring && adduser --system spring --ingroup spring
USER spring:spring

CMD ["java", "-jar", "target/foodordering-0.0.1-SNAPSHOT.jar"]