# Todo Management Web Application

The Todo Management Web Application is a client-side Angular application designed to manage user todos. It provides a user-friendly interface for interacting with todo items, leveraging Angular's robust features and best practices.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Best Practices](#best-practices)
- [Docker and Nginx Setup](#docker-and-nginx-setup)
- [Installation](#installation)
- [API Repository](#API-Repository)

## Features

- **Authentication and Registration:**

  - Register by creating your account as a new User.
  - Login to your account in order to have access to the main part of the application.

- **Todo Management:**

  - Create, retrieve, update, and delete todos.
  - Set priorities (high, medium, low) and status (e.g., completed, pending) for todos.
  - Filter todos by status and display them in a drag-and-drop board.

- **User Interaction:**

  - User authentication using login and registration forms.
  - Responsive design optimized for both mobile and desktop views.
  - Modal dialogs for adding, editing, and confirming actions on todos.

- **Error Handling:**

  - Display user-friendly messages for errors or successful operations.
  - Global loading spinner to indicate ongoing HTTP requests.

- **Routing:**
  - Lazy-loaded modules for optimized performance.
  - Dynamic route handling with Angular's Router.

## Technologies Used

- **Frontend:**

  - Angular Version 16: Framework for building the web application.
  - Angular Material: UI component library for a polished user interface.
  - RxJS: Library for reactive programming using observables.
  - Nginx: Web server used to serve the Angular application.

- **Development Tools:**
  - Docker: Containerization tool for building and running the application.
  - Node.js: JavaScript runtime used for building and managing the Angular project.

## Best Practices

- **Lazy Loading:** Modules are loaded on demand to improve performance and reduce initial load times.

  - **Modules:**
    - `AuthModule`: Contains authentication components (login and registration).
    - `HomeModule`: Contains the Home component.
    - `TodosModule`: Contains todo-related components.
    - `SharedModule`: Contains all the shared elements of the application.

- **Angular Routing:**

  - **Resolvers:** Used to fetch data before navigating to a route, ensuring data is available when the user reaches the route.
    - **Example:** `TodoResolver` fetches todos before the `TodosComponent` is displayed.
  - **Guards:** Used to control route access based on conditions (e.g., user authentication).
    - **Example:** `AuthGuard` prevents unauthorized access to protected routes.

- **Reactive Forms:** Used for managing forms with validation and dynamic behavior.

  - **Example:** `todoForm` with validation for creating and updating todos.

- **Loading Indicators:** Global loading spinner managed via an HTTP interceptor and a loading service.
  - **Example:** `LoadingInterceptor` shows a spinner during HTTP requests and hides it afterward.

## Docker and Nginx Setup

- **Docker:** The application is containerized using Docker, allowing for consistent deployment across various environments. Docker ensures that the application and its dependencies are bundled together in a container image.

- **Nginx:** Nginx is used as a web server to serve the Angular application. It provides efficient static file serving and handles HTTP requests, making the application accessible over the web.

## Installation

- To set up the application locally:

  1. **Clone the Repository:**

     ```bash
     git clone https://github.com/mawalou14/TodoManagementApp.git
     ```

  2. **Install Packages:**

     ```bash
     cd TodoManagementApp
     npm install
     ng serve
     ```

  3. **Start the Application:**
     ```bash
     ng serve
     ```

- To set up and run the application using Docker:

  1. **Build the Docker Image:**

     Navigate to the root directory of the project where the `Dockerfile` is located, then build the Docker image:

     ```bash
     docker build -t todo-management-app .
     ```

  2. **Run the Docker Container:**

     Start a Docker container from the built image and map it to a port on your host machine. For example, to map it to port 1414:

     ```bash
     docker run -p 1414:80 todo-management-app
     ```

  3. **Access the Application:**

     Open your web browser and navigate to `http://localhost:1414` to view the application running in Docker.

- **API Repository:**

For detailed information on the API endpoints and how to use them, please refer to the [API Repository](https://github.com/mawalou14/TodoManagementApi.git).
