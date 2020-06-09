import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async store(req: Request, res: Response): Promise<Response> {
    const {
      body: { name, email, password },
    } = req;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  }
}
