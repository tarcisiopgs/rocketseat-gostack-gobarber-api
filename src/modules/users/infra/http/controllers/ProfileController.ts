import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const {
      user: { id: user_id },
    } = req;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    delete user.password;

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      body: { name, email, password, old_password },
      user: { id: user_id },
    } = req;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({ user_id, name, email, password, old_password });

    delete user.password;

    return res.json(user);
  }
}
