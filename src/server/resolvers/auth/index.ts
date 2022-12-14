import { Resolver } from 'type-graphql';

import combineResolvers from '~/helpers/combineResolvers';
import changePassword from './changePassword';
import forgotPassword from './forgotPassword';
import getSession from './getSession';
import login from './login';
import loginFacebook from './loginFacebook';
import logout from './logout';
import register from './register';
import verifiedUser from './verifiedUser';

@Resolver()
export default class AuthResolver extends combineResolvers(
  login,
  register,
  forgotPassword,
  changePassword,
  logout,
  getSession,
  verifiedUser,
  loginFacebook
) {}
