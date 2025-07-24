# Utilise une image de base Java 17 slim pour une taille réduite
FROM openjdk:17-jdk-slim

# Définit le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copie le fichier JAR de votre application dans le conteneur.
# Assurez-vous que le chemin 'backend/target/*.jar' correspond à l'emplacement de votre JAR après le build.
# Le caractère '*' est utilisé pour capturer le nom exact du JAR généré.
COPY target/*.jar app.jar

# Expose le port sur lequel l'application Spring Boot écoute (par défaut 8080)
EXPOSE 8080

# Définit la commande pour exécuter l'application JAR au démarrage du conteneur
ENTRYPOINT ["java", "-jar", "app.jar"]