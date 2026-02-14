import { Module } from '@nestjs/common';
import { HeroController } from './hero/hero.controller';
import { HeroService } from './hero/hero.service';

/**
 * GrpcModule - gRPC Microservices Module
 *
 * This module demonstrates NestJS microservices with gRPC transport.
 *
 * Key Concepts:
 * - Microservices: NestJS can run as a microservice using various transport layers
 * - gRPC: High-performance RPC framework using Protocol Buffers
 * - Hybrid Application: Can run both HTTP and gRPC simultaneously
 *
 * The gRPC configuration is done in main.ts using connectMicroservice()
 */
@Module({
  controllers: [HeroController],
  providers: [HeroService],
  exports: [HeroService],
})
export class GrpcModule {}
