# ============================================================
# Dockerfile multi-stage para la aplicacion Java GraphQL
# Stage 1: Compilar con Maven
# Stage 2: Ejecutar con JRE 21 (imagen liviana)
# ============================================================

# --- STAGE 1: Build ---
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copiar POM primero para cachear dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar codigo fuente y compilar
COPY src ./src
RUN mvn clean package -DskipTests -B

# --- STAGE 2: Runtime ---
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copiar JAR compilado desde stage anterior
COPY --from=build /app/target/*.jar app.jar

# Puerto de la aplicacion
EXPOSE 8080

# Ejecutar la aplicacion
ENTRYPOINT ["java", "-jar", "app.jar"]
