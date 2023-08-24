import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    service.create({
      title: 'Test Movie',
      genres: ['test'],
      year: 2023,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should be throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('deleteOne', () => {
    it('delete movie', () => {
      const allMoviesLen = service.getAll().length;
      service.deleteOne(1);
      const afterDeleteLen = service.getAll().length;
      expect(afterDeleteLen).toEqual(allMoviesLen - 1);
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const befroreCreate = service.getAll().length;
      service.create({
        title: 'Test Movie2',
        genres: ['test'],
        year: 2023,
      });
      const afterCraate = service.getAll().length;
      expect(afterCraate).toBeGreaterThan(befroreCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.update(1, { title: 'Update Text' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Update Text');
    });
    it('should return a 404', () => {
      try {
        service.update(999, { title: 'works?' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
