/* eslint-disable no-undef */
// import { sum } from '../foo'
import * as request from 'supertest'
// import app from '../src/app'
const requests = request('http://localhost:3333')
describe('log in API', function () {
  it('responds with json', async (done) => {
    await requests
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@admin.com',
        password: 'admin'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  }, 30000)
})
