import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

const userIdMock = jest.fn();
const userTokenMock = jest.fn();

describe('User (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST): Create User', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      fullName: 'Jonh Dueww',
      email: 'jonhdueew@gmail.com',
      password: 'senha123',
      accountBalance: 1000,
    });

    userIdMock.mockReturnValue(response.body.id);

    expect(response.status).toBe(201);
  });

  it('/auth (POST): Login User', async () => {
    const response = await request(app.getHttpServer()).post('/auth').send({
      email: 'jonhdueew@gmail.com',
      password: 'senha123',
    });

    userTokenMock.mockReturnValue(response.body.accessToken);

    expect(response.status).toBe(200);
  });

  it('/users/{user} (GET): Get User By Id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${userIdMock()}`)
      .set('Authorization', `Bearer ${userTokenMock()}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('/users/{user} (PATCH): Update User By Id', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/users/${userIdMock()}`)
      .set('Authorization', `Bearer ${userTokenMock()}`)
      .send({
        fullName: 'Jonh Duwe 2',
      });

    expect(response.status).toBe(204);
  });

  it('/users/{user} (DELETE): Delete User By Id', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/users/${userIdMock()}`)
      .set('Authorization', `Bearer ${userTokenMock()}`)
      .send();

    expect(response.status).toBe(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
