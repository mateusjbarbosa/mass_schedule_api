import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';

import { BaseController } from '@src/controllers';
import { Celebration } from '@src/models/celebration';

@Controller('celebrations')
export class CelebrationController extends BaseController {
  @Post('')
  public async createCelebration(req: Request, res: Response): Promise<void> {
    try {
      const user = new Celebration(req.body);
      const result = await user.save();

      res.setHeader('Content-Location', `/celebrations/${result.id}`);
      res.status(201).send(user);
    } catch (err) {
      this.sendCreateUpdateErrorResponse(res, err);
    }
  }

  @Get('')
  public async readAllCelebrations(_: Request, res: Response): Promise<void> {
    const celebrations = await Celebration.find({});
    res.status(200).send(celebrations);
  }
}
