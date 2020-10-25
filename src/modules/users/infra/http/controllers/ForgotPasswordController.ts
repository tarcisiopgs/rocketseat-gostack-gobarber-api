import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async store(req: Request, res: Response): Promise<Response> {
    const {
      body: { email },
    } = req;

    const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailService);

    await sendForgotPasswordEmail.execute({ email });

    return res.status(204).json();
  }
}
