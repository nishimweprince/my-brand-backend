import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { tags } from "./tags.js";

const options = {
  definition: {
    openapi: "3.0.3", // Present supported openapi version
    info: {
      title: "ATLP My Brand API", // Title (required)
      description: "Docs for ATLP Capstone Project My Brand", // Description (required)
      version: "1.0.0", // Version (required)
      contact: {
        name: "Nishimwe Prince", // Name of the author
        email: "princeelysee@gmail.com", // Email of the author
        url: "https://atlp-my-brand-nishimwe.web.app/", // Website of the author
      },
    },
    servers: [ // Server URLs
        {
          url: "http://localhost:4000/api", // Localhost for development environment
          description: "DEV"
        },
        {
            url: process.env.HOST, // Production server hosted on Cyclic
            description: "PROD"
        }
      ],
      tags, // Tags imported from src/docs/tags.js
  },
  apis: ["../routes/*.js", "../docs/*.js"], // Path to the API docs

};

export { options };