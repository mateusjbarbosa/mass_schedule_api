import { User } from '@src/models/user';

import userRegisterCorrectFixture from '../fixtures/user_register_correct_fixture.json';
import userRegisterTypeErrorFixture from '@test/fixtures/user_register_error_type_fixture.json';
import userRegisterWithoutFixture from '@test/fixtures/user_register_without_fullName_fixture.json';

describe('User functional tests', () => {
  beforeAll(async () => User.deleteMany({}));

  describe('When creating a user', () => {
    it('should sucessfully create a user', async () => {
      const userBody = userRegisterCorrectFixture;

      const { headers, body, status } = await global.testRequest
        .post('/users')
        .send(userBody);

      expect(status).toBe(201);
      expect(headers['content-location']).toContain('/users/');
      expect(body).toEqual(expect.objectContaining(userBody));
    });

    it('should return 422 when a user item data is missing', async () => {
      const userBody = userRegisterWithoutFixture;

      const { body, status } = await global.testRequest
        .post('/users')
        .send(userBody);

      expect(status).toBe(422);
      expect(body).toEqual({
        code: 422,
        error: 'User validation failed: fullName: Path `fullName` is required.',
      });
    });

    it('should return 422 when there is a type error', async () => {
      const userBody = userRegisterTypeErrorFixture;

      const { body, status } = await global.testRequest
        .post('/users')
        .send(userBody);

      expect(status).toBe(422);
      expect(body).toEqual({
        code: 422,
        error:
          'User validation failed: celebration_allowed_count: Cast to Number failed for value "is a 3" at path "celebration_allowed_count"',
      });
    });

    it('should return 409 when the general record already exists', async () => {
      const userBody = userRegisterCorrectFixture;

      const { body, status } = await global.testRequest
        .post('/users')
        .send(userBody);

      expect(status).toBe(409);
      expect(body).toEqual({
        code: 409,
        error: 'User validation failed: generalRecord: already exists in the database, individualRecord: already exists in the database',
      });
    });
  });

  describe('When reading a user', () => {
    it('should return all registered users', async () => {
      const userBody = userRegisterCorrectFixture;

      const { body, status } = await global.testRequest.get('/users');

      expect(status).toBe(200);
      expect(body).toEqual([expect.objectContaining(userBody)]);
    });
  });
});
