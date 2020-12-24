import { User } from '@src/models/user';

import userRegisterCorrectFixture from '@test/fixtures/user_register_correct_fixture';
import userRegisterTypeErrorFixture from '@test/fixtures/user_register_error_type_fixture';
import userRegisterWithoutFixture from '@test/fixtures/user_register_without_fullName_fixture';

describe('User functional tests', () => {
  beforeAll(async () => User.deleteMany({}));

  describe('When creating a user', () => {
    it('should create a user with sucess', async () => {
      const newUser = userRegisterCorrectFixture;

      const response = await global.testRequest.post('/users').send(newUser);

      expect(response.status).toBe(204);
      expect(response.headers['content-location']).toContain('/users/');
    });

    it('should return 422 when a user item data is missing', async () => {
      const newUser = userRegisterWithoutFixture;

      const response = await global.testRequest.post('/users').send(newUser);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error: 'User validation failed: fullName: Path `fullName` is required.',
      });
    });

    it('should return 422 when there is a type error', async () => {
      const newUser = userRegisterTypeErrorFixture;

      const response = await global.testRequest.post('/users').send(newUser);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error:
          'User validation failed: celebration_allowed_count: Cast to Number failed for value "is a 3" at path "celebration_allowed_count"',
      });
    });
  });

  describe('When reading a user', () => {
    it('should return all registered users', async () => {
      const user = userRegisterCorrectFixture;

      const { body, status } = await global.testRequest.get('/users');

      const expectedUser = [{
        id: body[0]['id'],
        ...user
      }];

      expect(status).toBe(200);
      expect(body).toEqual(expectedUser);
    });
  });
});
