import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './src/app.module';
import { truncateTable } from 'src/helpers/truncateTable';

let app: INestApplication;

beforeAll(async () => {
  console.log('setup')
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
  console.log(app)
  global.testApp = app;
 
});

afterAll(async () => {
  await truncateTable('users');
  await app.close();
});
