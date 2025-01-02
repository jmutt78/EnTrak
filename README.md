# Entrak

Entrak is an application for tracking and managing various types of media (movies, TV shows, books, etc.). This guide will help you set up and run the application locally using Docker and MySQL.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/entrak.git
cd entrak
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables:

```env
NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
CLERK_API_KEY=<your-clerk-api-key>
DATABASE_URL="mysql://root:password@localhost:3306/entrak"
```

### 3. Build and Run the Docker Containers

Build and start the MySQL container:

```bash
docker-compose up --build
```

This command will:
- Build the MySQL Docker image.
- Start the MySQL container.
- Expose the MySQL service on port 3306.

### 4. Install Dependencies

Install the Node.js dependencies required for the application:

```bash
npm install
```

### 5. Set Up Prisma

Initialize Prisma and run the migrations to set up the database schema:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 6. Run the Application

Start the development server:

```bash
npm run dev
```

If you want to use the Clerk authentication service, you can start the Clerk service by running:
```bash
ngrok http 3000   
```

This will start the Next.js application on `http://localhost:3000`.


## Project Structure

- `pages/`: Contains the Next.js pages for the app.
- `prisma/`: Contains the Prisma schema and migrations.
- `Dockerfile`: Docker configuration for running the app.
- `docker-compose.yml`: Docker Compose configuration for orchestrating containers.

## Developing

- To add new Prisma models or update existing ones, modify the `prisma/schema.prisma` file and run `npx prisma migrate dev`.
- To interact with the database in your application, use the generated Prisma client.

## Troubleshooting

- **Docker Issues**: If you encounter issues with Docker, ensure that Docker is running and that the ports used by the services are not being blocked by other applications.
- **Database Connection**: Ensure that the `DATABASE_URL` in your `.env.local` file is correctly configured to connect to the local MySQL database.

## Future Plans

- Implement API endpoints for user management and authentication.
- Integrate Clerk for user sign-up and sign-in.
- Deploy to a production environment using Planetscale for database hosting.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
