
# Use an official Maven image as a build stage
FROM openjdk:17-jdk-slim AS build
WORKDIR /app
COPY . .
RUN chmod 777 ./mvnw
RUN ./mvnw clean install

# Use AdoptOpenJDK as the base image for the final image
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Specify the command to run your application
CMD ["java", "-jar", "app.jar"]

