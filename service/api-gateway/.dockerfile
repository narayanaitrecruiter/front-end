# Use the official OpenJDK 17 base image
FROM openjdk:17-jdk-slim AS builder

# Set the working directory
WORKDIR /app

# Copy only the Gradle files to cache dependencies
COPY build.gradle settings.gradle ./
COPY gradle ./gradle
COPY gradlew ./gradlew


# Download and cache dependencies
RUN ./gradlew --no-daemon dependencies

# Copy the application source code
COPY src ./src

# Build the application
RUN ./gradlew --no-daemon build

# Use a lightweight base image for the final application
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the JAR file from the builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Command to run the application
CMD ["java", "-jar", "app.jar"]
