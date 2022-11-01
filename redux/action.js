import * as Types from './types';

export function doLogin(payload) {
  return {
    type: Types.DO_LOGIN,
    payload,
  };
}

export function logOut(payload) {
  return {
    type: Types.LOG_OUT,
    payload,
  };
}

export function signUp(payload) {
  return {
    type: Types.SIGN_UP,
    payload,
  };
}

export function socialLogin(payload) {
  return {
    types: Types.SOCIAL_LOGIN,
    payload
  }
}

