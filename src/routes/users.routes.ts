import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const {
    body: { name, email, password },
  } = req;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return res.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (req, res) => {
  const {
    file: { filename: avatarFilename },
    user: { id: user_id },
  } = req;

  const updateUserAvatar = new UpdateUserAvatarService();

  const user = await updateUserAvatar.execute({ user_id, avatarFilename });

  delete user.password;

  return res.json(user);
});

export default usersRouter;
