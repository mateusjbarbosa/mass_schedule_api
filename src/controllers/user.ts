import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';

import mongoose from 'mongoose';

import { User } from '@src/models/user';
@Controller('users')
export class UserController {
  @Post('')
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = new User(req.body);
      const result = await user.save();

      res.setHeader('Content-Location', `/users/${result.id}`);
      res.status(204).send();
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(422).send({ error: err.message });
      } else {
        res.status(500).send({ error: 'Internal Server Error' });
      }
    }
  }

  @Get('')
  public async readAllUsers(_: Request, res: Response): Promise<void> {
    const users = await User.find({});
    res.status(200).send(users);
  }
}
