import { Transport, GrpcOptions } from '@nestjs/microservices';
import { join } from 'path';

/**
 * gRPC Microservice Configuration
 *
 * Industry Best Practices:
 * 1. Separate configuration from application bootstrap
 * 2. Use environment variables for host/port
 * 3. Centralize proto file path resolution
 * 4. Make configuration reusable and testable
 */
export const grpcClientOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero',
    // Proto file path resolution:
    // - Development (ts-node): src/config -> ../modules/grpc/proto/hero.proto
    // - Production (compiled): dist/config -> ../modules/grpc/proto/hero.proto
    // The proto file is copied to dist/ by nest-cli.json assets configuration
    protoPath: join(__dirname, '..', 'modules', 'grpc', 'proto', 'hero.proto'),
    url: process.env.GRPC_URL || '0.0.0.0:5000',
    // Additional production-ready options:
    loader: {
      keepCase: true, // Preserve field names
      longs: String, // Convert long values to strings
      enums: String, // Convert enums to strings
      defaults: true, // Set default values for missing fields
      oneofs: true, // Include virtual oneof properties
    },
  },
};
