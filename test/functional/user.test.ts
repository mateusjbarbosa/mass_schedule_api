import { User } from '@src/models/user';

describe('User functional tests', () => {
  beforeAll(async () => User.deleteMany({}));

  describe('When creating a user', () => {
    it('should create a user with sucess', async () => {
      const newUser = {
        telephoneNumber: '35991282121',
        fullName: 'Mateus José Barbosa',
        dateBirth: '1999-10-03',
        isTithe: true,
        street: 'Rua Benedito Pinto dos Santos',
        houseNumber: '350',
        neighborhood: 'Santa Barbara',
        city: 'Conceição dos Ouros',
        state: 'MG',
        generalRecord: 'MG18108433',
        individualRecord: '14334545645',
        role: 'FAITH',
        celebration_allowed_count: 3,
      };

      const response = await global.testRequest.post('/users').send(newUser);

      expect(response.status).toBe(204);
      expect(response.headers['content-location']).toContain('/users/');
    });

    it('should return 422 when a user item data is missing', async () => {
      const newUser = {
        telephoneNumber: '35991282121',
        dateBirth: '1999-10-03',
        isTithe: true,
        street: 'Rua Benedito Pinto dos Santos',
        houseNumber: '350',
        neighborhood: 'Santa Barbara',
        city: 'Conceição dos Ouros',
        state: 'MG',
        generalRecord: 'MG18108433',
        individualRecord: '14334545645',
        role: 'FAITH',
        celebration_allowed_count: 3,
      };

      const response = await global.testRequest.post('/users').send(newUser);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error: 'User validation failed: fullName: Path `fullName` is required.',
      });
    });

    it('should return 422 when there is a type error', async () => {
      const newUser = {
        telephoneNumber: '35991282121',
        fullName: 'Mateus José Barbosa',
        dateBirth: '1999-10-03',
        isTithe: true,
        street: 'Rua Benedito Pinto dos Santos',
        houseNumber: '350',
        neighborhood: 'Santa Barbara',
        city: 'Conceição dos Ouros',
        state: 'MG',
        generalRecord: 'MG18108433',
        individualRecord: '14334545645',
        role: 'FAITH',
        celebration_allowed_count: 'is_3',
      };

      const response = await global.testRequest.post('/users').send(newUser);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error:
          'User validation failed: celebration_allowed_count: Cast to Number failed for value "is_3" at path "celebration_allowed_count"',
      });
    });
  });

  describe('When reading a user', () => {
    it('should return all registered users', async () => {
      const { body, status } = await global.testRequest.get('/users');

      expect(status).toBe(200);
      expect(body).toEqual([
        {
          id: 1,
          telephoneNumber: '35991282121',
          fullName: 'Mateus José Barbosa',
          dateBirth: '1999-10-03',
          isTithe: true,
          street: 'Rua Benedito Pinto dos Santos',
          houseNumber: '350',
          neighborhood: 'Santa Barbara',
          city: 'Conceição dos Ouros',
          state: 'MG',
          generalRecord: 'MG18108433',
          individualRecord: '14334545645',
          role: 'FAITH',
          celebration_allowed_count: 3,
        },
        {
          id: 2,
          telephoneNumber: '35991205542',
          fullName: 'Alcino Teixeira',
          dateBirth: '1978-15-12',
          isTithe: false,
          street: 'Rua das Flores',
          houseNumber: '123',
          neighborhood: 'Jardim América',
          city: 'São Paulo',
          state: 'SP',
          generalRecord: '355215597',
          individualRecord: '01609050878',
          role: 'FAITH',
          celebration_allowed_count: 3,
        },
      ]);
    });
  });
});
