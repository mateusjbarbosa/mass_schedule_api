import { Celebration } from '@src/models/celebration';

describe('Celebration functional tests', () => {
  beforeAll(async () => Celebration.deleteMany({}));

  describe('When creating a celebration', () => {
    it('should sucessfully create a celebration', async () => {
      const celebrationBody = {
        date: '2020-24-12 20:00:00',
        type: 'MASS',
        faithful_allowed_count: 60,
      };

      const { headers, body, status } = await global.testRequest
        .post('/celebrations')
        .send(celebrationBody);

      expect(status).toBe(201);
      expect(headers['content-location']).toContain('/celebrations/');
      expect(body).toEqual(expect.objectContaining(celebrationBody));
    });

    it('should return 422 when a celebration item data is missing', async () => {
      const celebrationBody = {
        date: '2020-25-12 10:00:00',
        faithful_allowed_count: 60,
      };

      const { body, status } = await global.testRequest
        .post('/celebrations')
        .send(celebrationBody);

      expect(status).toBe(422);
      expect(body).toEqual({
        code: 422,
        error: 'Celebration validation failed: type: Path `type` is required.',
      });
    });

    it('should return 422 when there is a type error', async () => {
      const celebrationBody = {
        date: '2020-25-12 08:00:00',
        type: 'MASS',
        faithful_allowed_count: 'is_60',
      };

      const { body, status } = await global.testRequest
        .post('/celebrations')
        .send(celebrationBody);

      expect(status).toBe(422);
      expect(body).toEqual({
        code: 422,
        error:
          'Celebration validation failed: faithful_allowed_count: Cast to Number failed for value "is_60" at path "faithful_allowed_count"',
      });
    });

    it('should return 409 when the celebration in date and hour already exists', async () => {
      const celebrationBody = {
        date: '2020-24-12 20:00:00',
        type: 'MASS',
        faithful_allowed_count: 60,
      };

      const { body, status } = await global.testRequest
        .post('/celebrations')
        .send(celebrationBody);

      expect(status).toBe(409);
      expect(body).toEqual({
        code: 409,
        error:
          'Celebration validation failed: date: already exists in the database',
      });
    });
  });

  describe('When reading a celebration', () => {
    it('should return all registered celebrations', async () => {
      const celebrationBody = {
        date: '2020-24-12 20:00:00',
        type: 'MASS',
        faithful_allowed_count: 60,
      };

      const { body, status } = await global.testRequest.get('/celebrations');

      expect(status).toBe(200);
      expect(body).toEqual(
        expect.arrayContaining([expect.objectContaining(celebrationBody)])
      );
    });
  });

  //   it('should return 401 if the celebration not found', async () => {
  //   });
});
