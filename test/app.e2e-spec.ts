import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Repository } from 'typeorm/repository/Repository';
import { User } from '../src/entities/user.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let locationRepository: Repository<Location>;

  let userToken;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = await moduleFixture.get('UserRepository');
    locationRepository = await moduleFixture.get('LocationRepository');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/location (GET) should return locations', () => {
    return request(app.getHttpServer())
      .get('/location')
      .expect(200);
  });

  it('/location (POST) should create new location', () => {
    return request(app.getHttpServer())
      .post('/location')
      .expect(200);
  });

  it('/auth/register (POST) should register new user', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ username: 'newUser', password: 'test123' })
      .expect(201);
  });

  it('/auth/register (POST) should return error because user already exists', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ username: 'newUser', password: 'test123' })
      .expect(400);
  });

  it('/auth/login (POST) should return access_token', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'newUser', password: 'test123' })
      .expect(201)
      .then(res => {
        userToken = res.body.access_token;
      });
  });

  it('/auth/login (POST) should return error because of wrong password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'newUser', password: 'test111' })
      .expect(400);
  });

  // it('Example how to include jwt in request', () => {
  //   return request(app.getHttpServer())
  //     .post('/something')
  //     .set('authorization', `Bearer ${userToken}`)
  //     .expect(200)
  //     .expect({ someData: true });
  // });

  afterAll(async () => {
    await locationRepository.query('DELETE FROM "location"');
    await userRepository.query('DELETE FROM "user"');
  });
});
