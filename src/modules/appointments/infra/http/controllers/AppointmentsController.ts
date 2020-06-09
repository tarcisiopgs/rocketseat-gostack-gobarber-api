import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async store(req: Request, res: Response): Promise<Response> {
    const {
      body: { provider_id, date },
    } = req;

    const parsedDate = parseISO(date);
    const createAppointment = container.resolve(CreateAppointmentService);
    const appointment = await createAppointment.execute({ provider_id, date: parsedDate });

    return res.json(appointment);
  }
}
