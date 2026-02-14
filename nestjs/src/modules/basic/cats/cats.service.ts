import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import type { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  private idCounter = 1;

  create(createCatDto: CreateCatDto): Cat {
    const cat: Cat = {
      id: this.idCounter++,
      ...createCatDto,
    };
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    const cat = this.cats.find((cat) => cat.id === id);
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return cat;
  }

  update(id: number, updateCatDto: UpdateCatDto): Cat {
    const cat = this.findOne(id);
    const index = this.cats.indexOf(cat);
    const updatedCat = { ...cat, ...updateCatDto };
    this.cats[index] = updatedCat;
    return updatedCat;
  }

  remove(id: number): void {
    const index = this.cats.findIndex((cat) => cat.id === id);
    if (index === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    this.cats.splice(index, 1);
  }
}
