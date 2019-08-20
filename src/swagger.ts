import swaggerJSDoc = require('swagger-jsdoc')
const options = {
  // List of files to be processed.
  apis: ['**/*.ts'],
  host: 'localhost:3333',
  swaggerDefinition: {
    info: {
      title: 'RestFul API with TypeScript, TypeORM (MySql) and JWT',
      version: '1.0.0',
      description: 'Orbita Challenge API',
      contact: {
        email: 'marciondb@gmail.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    host: 'localhost:3333',
    basePath: '/api/v1',
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        scheme: 'bearer',
        name: 'Authorization',
        bearerFormat: 'JWT',
        description: 'Enter your bearer token in the format **Bearer &lt;token>**'
      }
    },
    security: [{
      bearerAuth: []
    }],
    externalDocs: {
      description: 'Márcio Dias',
      url: 'https://www.linkedin.com/in/marciondb/'
    }
  }
}
const specs = swaggerJSDoc(options)

export default specs
