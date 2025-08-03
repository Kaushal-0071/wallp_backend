
<div align="center">

# wallp_backend

[![GitHub Issues](https://img.shields.io/github/issues/Kaushal-0071/wallp_backend)](https://github.com/Kaushal-0071/wallp_backend/issues)
[![GitHub Stars](https://img.shields.io/github/stars/Kaushal-0071/wallp_backend)](https://github.com/Kaushal-0071/wallp_backend/stargazers)

</div>

This repository contains the backend code for a wallpaper application. It provides API endpoints to fetch and search images, leveraging a MongoDB database to store image metadata. The backend is built using Node.js, Express, and MongoDB, offering a scalable and efficient solution for managing wallpaper data.

## Features

-   **Image Retrieval:** Fetches all images from the database, sorted by the newest first.
-   **Search Functionality:** Enables searching for images based on name, creator, or dominant colors.
-   **MongoDB Integration:** Utilizes MongoDB for storing and retrieving image metadata.
-   **RESTful API:** Provides well-defined API endpoints for image-related operations.
-   **CORS Support:** Implements Cross-Origin Resource Sharing (CORS) to allow requests from different origins.

## Table of Contents

-   [Installation](#installation)
-   [Running the Project](#running-the-project)
-   [Dependencies](#dependencies)
-   [Contributing](#contributing)
-   [License](#license)
-   [Contact](#contact)

## Installation

To set up the project, follow these steps:

1.  Clone the repository:
    ```bash
    git clone https://github.com/Kaushal-0071/wallp_backend.git
    cd wallp_backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

## Running the Project

To run the project:

1.  Set up your `.env` file with the following variables:

    ```
    MONGO_URI=your_mongodb_connection_string
    DB_NAME=your_database_name
    COLLECTION_NAME=your_collection_name
    PORT=5000
    ```

    Ensure the `MONGO_URI` is a valid MongoDB connection string, `DB_NAME` is the name of the database you want to use, and `COLLECTION_NAME` is the name of the collection where image data is stored. The `PORT` variable specifies the port on which the server will run.

2.  Start the server:
    ```bash
    npm start
    ```

    Alternatively, you can use `node app.js` to start the server directly.

The server will start running on the specified port (default: 5000). You can then access the API endpoints using tools like `curl` or Postman.

Example API endpoints:

-   `GET /api/images`: Fetches all images.
    ```bash
    curl http://localhost:5000/api/images
    ```
-   `GET /api/images/search?q=query`: Searches images with a specific query.
    ```bash
    curl http://localhost:5000/api/images/search?q=nature
    ```

## Dependencies

-   **express**: Fast, unopinionated, minimalist web framework for Node.js.
    ```bash
    npm install express
    ```
-   **mongodb**: The official MongoDB driver for Node.js.
    ```bash
    npm install mongodb
    ```
-   **cors**: Node.js package for providing a Connect/Express middleware that can be used to enable CORS.
    ```bash
    npm install cors
    ```
-   **mongoose**: Elegant MongoDB object modeling for Node.js.
    ```bash
    npm install mongoose
    ```

## Contributing

Contributions are welcome! Here’s how you can contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main repository.


