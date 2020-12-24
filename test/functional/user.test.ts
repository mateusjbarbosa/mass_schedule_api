import { User } from '@src/models/user';

import { AuthService } from '@src/services/auth';

import userRegisterCorrectFixture from '../fixtures/user/user_register_correct_fixture.json';
import userRegisterTypeErrorFixture from '@test/fixtures/user/user_register_error_type_fixture.json';
import userRegisterWithoutFixture from '@test/fixtures/user/user_register_without_fullName_fixture.json';
import userRegisterSecretaryFixture from '@test/fixtures/user/user_register_secretary_fixture.json';
import userRegisterGeneralRecordExistsFixture from '@test/fixtures/user/user_register_general_record_exists_fixture.json';

describe('User functional tests', () => {
  beforeAll(async () => User.deleteMany({}));

  describe('When creating a user', () => {
    it('should sucessfully create a faith user', async () => {
      const userBody = userRegisterCorrectFixture;

      const { headers, body, status } = await global.testRequest
        .post('/users')
        .send(userBody);

      expect(status).toBe(201);
      expect(headers['content-location']).toContain('/users/');
      expect(body).toEqual(expect.objectContaining(userBody));
    });

    it('should sucessfully create a secretary user', async () => {
      const userBody = userRegisterSecretaryFixture;

      const { headers, body, status } = await global.testRequest
        .post('/users')
        .send(userBody);

      expect(status).toBe(201);
      expect(headers['content-location']).toContain('/users/');
      await expect(
        AuthService.comparePassword(userBody.password, body['password'])
      ).resolves.toBeTruthy();
      expect(body).toEqual(
        expect.objectContaining({
          ...userBody,
          ...{ password: expect.any(String) },
        })
      );
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
      const userBody = userRegisterGeneralRecordExistsFixture;

      const { body, status } = await global.testRequest
        .post('/users')
        .send(userBody);

      expect(status).toBe(409);
      expect(body).toEqual({
        code: 409,
        error:
          'User validation failed: generalRecord: already exists in the database',
      });
    });
  });

  describe('When reading a user', () => {
    it('should return all registered users', async () => {
      const userBody = userRegisterCorrectFixture;

      const { body, status } = await global.testRequest.get('/users');

      expect(status).toBe(200);
      expect(body).toEqual(
        expect.arrayContaining([expect.objectContaining(userBody)])
      );
    });
  });

  describe('When authenticating a user', () => {
    it('should generate a token for a valid user', async () => {
      const userBody = userRegisterSecretaryFixture;
      const { body } = await global.testRequest
        .post('/users/authenticate')
        .send({
          telephoneNumber: userBody.telephoneNumber,
          dateBirth: userBody.dateBirth,
          password: userBody.password,
        });

      expect(body).toEqual(
        expect.objectContaining({ token: expect.any(String) })
      );
    });

    it('should return 401 if the user not found', async () => {
      const { body, status } = await global.testRequest
        .post('/users/authenticate')
        .send({
          telephoneNumber: '11223344556',
          dateBirth: '1990-01-01',
          password: '11223344',
        });

      expect(status).toBe(401);
      expect(body).toEqual({
        code: 401,
        error: 'User not found',
      });
    });

    it('should return 401 if the user wrong password', async () => {
      const userBody = userRegisterSecretaryFixture;
      const { body, status } = await global.testRequest
        .post('/users/authenticate')
        .send({
          telephoneNumber: userBody.telephoneNumber,
          dateBirth: userBody.dateBirth,
          password: '1122334455',
        });

      expect(status).toBe(401);
      expect(body).toEqual({
        code: 401,
        error: 'Password does not match',
      });
    });
  });
});
