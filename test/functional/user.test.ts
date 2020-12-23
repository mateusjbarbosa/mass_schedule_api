import supertest from 'supertest';

describe('User functional tests', () => {
  it('should return all registered users', async() => {
    const { body, status } = await supertest(app).get('/users');

    expect(status).toBe(200);
    expect(body).toBe([{}]);
  })
});