const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { version } = require('../../package.json');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Store API Docs',
            version: version, // Explicitly use the version property for clarity
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            },
        ]
    },
    apis: ['./src/routes/products.route.js', './src/models/products.model.js', './src/routes/admin.route.js', './src/models/admin.model.js', './src/routes/basket.route.js', './src/models/basket.model.js'], // Update this path
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
    // Serve Swagger UI with proper configuration
    app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
          url: '/docs.json', // URL for the Swagger spec
        },
      })
    );
  
    // Serve the Swagger spec JSON
    app.get('/docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });
  
    console.log(`Docs available at http://localhost:${port}/docs`);
  }
  
  module.exports = swaggerDocs;