import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';

import { BaseController } from '@src/controllers';

import { User } from '@src/models/user';
import { AuthService } from '@src/services/auth';

@Controller('users')
export class UserController extends BaseController {
  @Post('')
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = new User(req.body);
      const result = await user.save();

      res.setHeader('Content-Location', `/users/${result.id}`);
      res.status(201).send(user);
    } catch (err) {
      this.sendCreateUpdateErrorResponse(res, err);
    }
  }

  @Get(':telephoneNumber')
  public async readUsersByTelephoneNumber(
    req: Request,
    res: Response
  ): Promise<void> {
    const users = await User.find({
      telephoneNumber: req.params.telephoneNumber,
    });
    console.log(users);
    res.status(200).send(users);
  }

  @Get('')
  public async readAllUsers(_: Request, res: Response): Promise<void> {
    const users = await User.find({});
    res.status(200).send(users);
  }

  @Post('authenticate')
  public async userAuthenticate(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { telephoneNumber, dateBirth, password } = req.body;
    const user = await User.findOne({ telephoneNumber: telephoneNumber, dateBirth: dateBirth });

    if (!user) {
      return res.status(401).send({
        code: 401,
        error: 'User not found',
      });
    }

    if (!(await AuthService.comparePassword(password, user.password))) {
      return res.status(401).send({
        code: 401,
        error: 'Password does not match',
      });
    }

    const token = AuthService.generateToken(user.toJSON());

    return res.status(200).send({ token: token });
  }
}
