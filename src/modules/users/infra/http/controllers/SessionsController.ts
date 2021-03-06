import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async store(req: Request, res: Response): Promise<Response> {
    const {
      body: { email, password },
    } = req;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    delete user.password;

    return res.json({ user, token });
  }
}
