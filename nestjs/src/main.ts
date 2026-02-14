import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { grpcClientOptions } from './config/grpc.config';

/**
 * Bootstrap function - Application entry point
 *
 * This demonstrates a Hybrid Application:
 * - HTTP Server (port 3000) - For REST API endpoints
 * - gRPC Microservice (port 5000) - For gRPC communication
 *
 * Both servers run simultaneously in the same process.
 *
 * Industry Best Practices:
 * - Separate configuration from bootstrap logic
 * - Use environment variables for configuration
 * - Centralize microservice options
 */
async function bootstrap() {
  // Create the main HTTP application
  const app = await NestFactory.create(AppModule);

  // Configure global validation pipe for HTTP requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Connect gRPC microservice using centralized configuration
  app.connectMicroservice(grpcClientOptions);

  // Start all microservices
  await app.startAllMicroservices();
  console.log('🚀 gRPC microservice is running on port 5000');

  // Start HTTP server
  await app.listen(process.env.PORT ?? 3000);
  console.log('🚀 HTTP server is running on port 3000');
}
void bootstrap();
