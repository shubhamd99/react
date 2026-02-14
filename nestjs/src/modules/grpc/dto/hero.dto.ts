import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

/**
 * DTO for Hero entity
 * Matches the Hero message in hero.proto
 */
export class HeroDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  power: string;

  @IsInt()
  @Min(1)
  @Max(100)
  level: number;
}

/**
 * DTO for finding a hero by ID
 * Matches the HeroById message in hero.proto
 */
export class HeroByIdDto {
  @IsInt()
  @Min(1)
  id: number;
}

/**
 * DTO for creating a new hero
 * Matches the CreateHeroRequest message in hero.proto
 */
export class CreateHeroDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  power: string;

  @IsInt()
  @Min(1)
  @Max(100)
  level: number;
}

/**
 * DTO for battle request
 * Matches the BattleRequest message in hero.proto
 */
export class BattleRequestDto {
  @IsInt()
  @Min(1)
  heroId: number;

  @IsString()
  @IsNotEmpty()
  action: string;
}

/**
 * DTO for battle response
 * Matches the BattleResponse message in hero.proto
 */
export class BattleResponseDto {
  heroId: number;
  result: string;
  damage: number;
}
