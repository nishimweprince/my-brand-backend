import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "ATLP My Brand API",
      description: "Docs for ATLP Capstone Project My Brand",
      version: "1.0.0",
      contact: {
        name: "Nishimwe Prince",
        email: "princeelysee@gmail.com",
        url: "https://atlp-my-brand-nishimwe.web.app/",
      },
    },
    servers: [
        {
          url: "http://localhost:4000/api",
          description: "DEV"
        },
        {
            url: "https://angry-leotard-frog.cyclic.app/",
            description: "PROD"
        }
      ],
  },
  apis: ["../routes/*.js", "../docs/*.js"],

};

export { options };
