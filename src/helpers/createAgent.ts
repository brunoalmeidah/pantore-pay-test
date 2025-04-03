import * as request from 'supertest';
export function createAgent() {
  const agent = request.agent(global.testApp.getHttpServer());
  return agent;
}
