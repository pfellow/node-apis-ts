import prisma from '../db';
import { comparePasswords, createJWT, hasPassword } from '../modules/auth';

export const createNewUser = async (req: any, res: any, next: any) => {
  try {
    const user = await prisma.user.findFirst({
      where: { username: req.body.username }
    });
    if (user) {
      const error = new Error('User with this email already exists');
      error.cause = 401;
      throw error;
    }
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hasPassword(req.body.password)
      }
    });
    if (!newUser) {
      throw new Error('Something went wrong with user creation!');
    }
    const token = createJWT(newUser);
    return res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req: any, res: any, next: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username
      }
    });
    let isValid = false;
    if (user?.password) {
      isValid = await comparePasswords(req.body.password, user.password);
    }
    if (!isValid) {
      const error = new Error('Invalid username or password!');
      error.cause = 401;
      throw error;
    }
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
