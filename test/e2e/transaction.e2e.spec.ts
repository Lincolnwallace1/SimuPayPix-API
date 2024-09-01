import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

const payingIdMock = jest.fn();
const receivingIdMock = jest.fn();
const transactionCodeMock = jest.fn();

describe('Transaction (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const payingResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        fullName: 'Jonh Dueww',
        email: 'paying@gmail.com',
        password: 'senha123',
        accountBalance: 1000,
      });

    payingIdMock.mockReturnValue(payingResponse.body.id);

    const receivingResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        fullName: 'Jonh Dueff',
        email: 'receiving@gmail.com',
        password: 'senha123',
        accountBalance: 1000,
      });

    receivingIdMock.mockReturnValue(receivingResponse.body.id);
  });

  it('/transactions (POST): Create Transaction', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth')
      .send({
        email: 'paying@gmail.com',
        password: 'senha123',
      });

    const response = await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .send({
        valueTransaction: 100,
        type: 'PAYMENT',
        paying: payingIdMock(),
        receiving: receivingIdMock(),
      });

    transactionCodeMock.mockReturnValue(response.body.code);

    expect(response.status).toBe(201);
  });

  it('/transactions/{code} (GET): Get Transaction By Code', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth')
      .send({
        email: 'paying@gmail.com',
        password: 'senha123',
      });

    const response = await request(app.getHttpServer())
      .get(`/transactions/${transactionCodeMock()}`)
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('/transactions/list (POST): Get All Transactions from User Token ', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth')
      .send({
        email: 'paying@gmail.com',
        password: 'senha123',
      });

    const response = await request(app.getHttpServer())
      .post('/transactions/list')
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .send({});

    expect(response.status).toBe(200);
  });

  it('/transactions/{code} (PATCH): Update transaction By Code', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth')
      .send({
        email: 'paying@gmail.com',
        password: 'senha123',
      });

    const response = await request(app.getHttpServer())
      .patch(`/transactions/${transactionCodeMock()}`)
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .send({
        valueTransaction: 200,
      });

    expect(response.status).toBe(204);
  });

  it('/transactions (DELETE): Delete transaction By Code', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth')
      .send({
        email: 'paying@gmail.com',
        password: 'senha123',
      });

    const response = await request(app.getHttpServer())
      .delete(`/transactions/${transactionCodeMock()}`)
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .send();

    expect(response.status).toBe(204);
  });

  it('/transactions/{code}/confirm (POST): Confirm Transaction', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth')
      .send({
        email: 'paying@gmail.com',
        password: 'senha123',
      });

    const response = await request(app.getHttpServer())
      .post(`/transactions/${transactionCodeMock()}/confirm`)
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .send({
        password: 'senha123',
      });

    expect(response.status).toBe(204);
  });

  it('/transactions/{code}/refute (POST): Refute Transaction', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth')
      .send({
        email: 'paying@gmail.com',
        password: 'senha123',
      });

    const response = await request(app.getHttpServer())
      .post(`/transactions/${transactionCodeMock()}/refute`)
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .send({
        password: 'senha123',
        reversalReason: 'Enviado para pessoa errada',
      });

    expect(response.status).toBe(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
