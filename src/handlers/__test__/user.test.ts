import * as user from '../user';

describe('user handler', () => {
  it('should create a new user', async () => {
    const req = { body: { username: 'hello-there', password: 'some-pass' } };
    const res = {
      json({ token }: any) {
        expect(token).toBeTruthy();
      }
    };
    await user.createNewUser(req, res, () => {});
  });
});
