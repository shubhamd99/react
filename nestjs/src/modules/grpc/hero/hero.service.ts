import { Injectable } from '@nestjs/common';
import { HeroDto, CreateHeroDto } from '../dto/hero.dto';

/**
 * HeroService - Business logic for hero operations
 *
 * This service demonstrates:
 * - In-memory data storage
 * - CRUD operations
 * - Data management for gRPC streaming
 */
@Injectable()
export class HeroService {
  // In-memory hero storage
  private heroes: HeroDto[] = [
    { id: 1, name: 'Iron Man', power: 'Technology', level: 85 },
    { id: 2, name: 'Thor', power: 'Lightning', level: 90 },
    { id: 3, name: 'Hulk', power: 'Strength', level: 88 },
    { id: 4, name: 'Black Widow', power: 'Espionage', level: 75 },
    { id: 5, name: 'Captain America', power: 'Super Soldier', level: 82 },
  ];

  private nextId = 6;

  /**
   * Find a hero by ID
   * Used for Unary RPC
   */
  findOne(id: number): HeroDto | undefined {
    return this.heroes.find((hero) => hero.id === id);
  }

  /**
   * Get all heroes
   * Used for Server Streaming RPC
   */
  findAll(): HeroDto[] {
    return this.heroes;
  }

  /**
   * Create a new hero
   * Used for Client Streaming RPC
   */
  create(createHeroDto: CreateHeroDto): HeroDto {
    const newHero: HeroDto = {
      id: this.nextId++,
      ...createHeroDto,
    };
    this.heroes.push(newHero);
    return newHero;
  }

  /**
   * Create multiple heroes
   * Used for Client Streaming RPC
   */
  createMany(createHeroDtos: CreateHeroDto[]): HeroDto[] {
    return createHeroDtos.map((dto) => this.create(dto));
  }

  /**
   * Simulate a battle action
   * Used for Bidirectional Streaming RPC
   */
  battle(heroId: number, action: string): { result: string; damage: number } {
    const hero = this.findOne(heroId);
    if (!hero) {
      return { result: 'Hero not found', damage: 0 };
    }

    // Simulate battle logic based on action
    let damage = 0;
    let result = '';

    switch (action.toLowerCase()) {
      case 'attack':
        damage = Math.floor(Math.random() * hero.level);
        result = `${hero.name} attacks with ${hero.power}!`;
        break;
      case 'defend':
        damage = 0;
        result = `${hero.name} defends!`;
        break;
      case 'special':
        damage = Math.floor(Math.random() * hero.level * 1.5);
        result = `${hero.name} uses special ${hero.power} ability!`;
        break;
      default:
        result = `${hero.name} is confused!`;
        damage = 0;
    }

    return { result, damage };
  }
}
