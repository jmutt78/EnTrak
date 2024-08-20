# Use the official MySQL image from the Docker Hub
FROM mysql:8.0

# Set the environment variables for the MySQL root password and database
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=entrak

# Expose the MySQL port
EXPOSE 3306
