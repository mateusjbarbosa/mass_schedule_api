import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';

import { BaseController } from '@src/controllers';

import { User } from '@src/models/user';
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

  @Get('')
  public async readAllUsers(_: Request, res: Response): Promise<void> {
    const users = await User.find({});
    res.status(200).send(users);
  }
}
