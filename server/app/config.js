global.PROJECT_NAME = "REST API";
global.PROJECT_URL = "http://localhost:3000";
global.PROJECT_VERSION = "1.0.0";

export const CONNECTION_STRING = "mongodb://localhost:27017/rest-api";

export const SWAGGER_OPTIONS = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API",
      version: "1.0.0",
      description: "REST API using expressJS / nodeJS / MongoDB",
      termsOfService: "",
      contact: {
        name: "",
        url: "",
        email: "",
      },
    },

    servers: [
      {
        url: "http://localhost:9000",
        description: "REST API Documentation",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
