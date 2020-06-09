import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const {
      file: { filename: avatarFilename },
      user: { id: user_id },
    } = req;

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({ user_id, avatarFilename });

    delete user.password;

    return res.json(user);
  }
}
