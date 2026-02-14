import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';
import { HeroService } from './hero.service';
import {
  HeroDto,
  HeroByIdDto,
  CreateHeroDto,
  BattleRequestDto,
  BattleResponseDto,
} from '../dto/hero.dto';

/**
 * HeroController - gRPC Controller
 *
 * This controller demonstrates all 4 gRPC communication patterns:
 * 1. Unary RPC - FindOne
 * 2. Server Streaming RPC - FindMany
 * 3. Client Streaming RPC - CreateHeroes
 * 4. Bidirectional Streaming RPC - BattleHeroes
 *
 * Key Concepts:
 * - @GrpcMethod() - Decorator for unary RPC methods
 * - @GrpcStreamMethod() - Decorator for streaming RPC methods
 * - Observable - RxJS Observable for streaming responses
 * - Subject - RxJS Subject for bidirectional streaming
 */
@Controller()
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  /**
   * PATTERN 1: Unary RPC
   * Client sends single request → Server sends single response
   *
   * Example: Find a specific hero by ID
   */
  @GrpcMethod('HeroService', 'FindOne')
  findOne(data: HeroByIdDto): HeroDto {
    const hero = this.heroService.findOne(data.id);
    if (!hero) {
      throw new Error(`Hero with ID ${data.id} not found`);
    }
    return hero;
  }

  /**
   * PATTERN 2: Server Streaming RPC
   * Client sends single request → Server sends stream of responses
   *
   * Example: Get all heroes one by one
   * The server sends each hero as a separate message in the stream
   */
  @GrpcStreamMethod('HeroService', 'FindMany')
  findMany(): Observable<HeroDto> {
    const heroes = this.heroService.findAll();
    const subject = new Subject<HeroDto>();

    // Simulate streaming by sending heroes one at a time with delay
    let index = 0;
    const interval = setInterval(() => {
      if (index < heroes.length) {
        subject.next(heroes[index]);
        index++;
      } else {
        subject.complete();
        clearInterval(interval);
      }
    }, 500); // Send one hero every 500ms

    return subject.asObservable();
  }

  /**
   * PATTERN 3: Client Streaming RPC
   * Client sends stream of requests → Server sends single response
   *
   * Example: Create multiple heroes and return all created heroes
   * The client sends multiple CreateHeroRequest messages
   * The server collects them all and returns a HeroList
   */
  @GrpcStreamMethod('HeroService', 'CreateHeroes')
  createHeroes(
    data: Observable<CreateHeroDto>,
  ): Observable<{ heroes: HeroDto[] }> {
    const subject = new Subject<{ heroes: HeroDto[] }>();
    const createdHeroes: HeroDto[] = [];

    data.subscribe({
      next: (createHeroDto: CreateHeroDto) => {
        // Process each incoming hero creation request
        const hero = this.heroService.create(createHeroDto);
        createdHeroes.push(hero);
        console.log(`Created hero: ${hero.name}`);
      },
      complete: () => {
        // When client finishes sending, return all created heroes
        subject.next({ heroes: createdHeroes });
        subject.complete();
      },
      error: (err) => {
        subject.error(err);
      },
    });

    return subject.asObservable();
  }

  /**
   * PATTERN 4: Bidirectional Streaming RPC
   * Client sends stream of requests ↔ Server sends stream of responses
   *
   * Example: Real-time hero battle simulation
   * Client sends battle actions, server responds with battle results
   * Both can send messages independently and simultaneously
   */
  @GrpcStreamMethod('HeroService', 'BattleHeroes')
  battleHeroes(
    data: Observable<BattleRequestDto>,
  ): Observable<BattleResponseDto> {
    const subject = new Subject<BattleResponseDto>();

    data.subscribe({
      next: (battleRequest: BattleRequestDto) => {
        // Process each battle action immediately
        const { heroId, action } = battleRequest;
        const battleResult = this.heroService.battle(heroId, action);

        // Send response back to client
        const response: BattleResponseDto = {
          heroId,
          result: battleResult.result,
          damage: battleResult.damage,
        };

        subject.next(response);
        console.log(`Battle: ${response.result} - Damage: ${response.damage}`);
      },
      complete: () => {
        subject.complete();
      },
      error: (err) => {
        subject.error(err);
      },
    });

    return subject.asObservable();
  }
}
