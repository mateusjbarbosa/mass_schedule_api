import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
@Controller('users')
export class UserController {
  @Post('')
  public async createUser(req: Request, res: Response): Promise<void> {
    res.status(204).send();
  }

  @Get('')
  public readAllUsers(_: Request, res: Response): void {
    res.send([
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
        updatedAt: '2020-12-23T12:04:16.175Z',
        createdAt: '2020-12-23T12:04:16.175Z',
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
  }
}
