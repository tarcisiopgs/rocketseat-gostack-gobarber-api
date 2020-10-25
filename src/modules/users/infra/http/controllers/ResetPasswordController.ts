import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async store(req: Request, res: Response): Promise<Response> {
    const {
      body: { token, password },
    } = req;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({ token, password });

    return res.status(204).json();
  }
}
