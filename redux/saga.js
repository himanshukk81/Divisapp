import {  call, takeLatest, put } from 'redux-saga/effects';
import * as Navigation from '../navigation/navigation';
import * as Apiservice from '../services/Api';
import * as Types from './types';
import { store } from './store';
import {  showResponse } from '../utility/Index';



function* signUp({ type, payload }) {
  try {
   
    yield put({ type: Types.SET_LOADING, payload: true }); //hide loading
    let response = yield call(Apiservice.signUp, payload);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    if (response && response.status) {
      showResponse('Regístrate con éxito');
      if (response.status == 10) {
        yield put({ type: Types.USER, payload: response }); //set user
      } else {
        
      }
    } else {
      showResponse(response);
    }
  } catch (error) {
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
  }
}

function* login({ type, payload }) {
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //show loading
    const response = yield call(Apiservice.loginApi, payload);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    if (response && response.status) {
      if (response.status == 10 && response.id) {
        yield put({ type: Types.USER, payload: response }); //set user
      } else {
       
      }
    }
    showResponse(response);
  } catch (error) {
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    console.log('error login', JSON.stringify(error));
  }
}

function* socialLogin({type, payload}){
  try {
    yield put({ type: Types.SET_LOADING, payload: true }); //show loading

    console.log("payload data==");

    console.log({payload:payload});
    
    const response = yield call(Apiservice.socialApi, payload);
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    if (response && response.status) {
      if (response.status == 10 && response.id) {
        yield put({ type: Types.USER, payload: response }); //set user
      } else {
       
      }
    }
    showResponse(response);
  } catch (error) {
    yield put({ type: Types.SET_LOADING, payload: false }); //hide loading
    console.log('error login', JSON.stringify(error));
  }
}

// Watcher
export default function* watcher() {
  // Take Last Action Only
  yield takeLatest(Types.DO_LOGIN, login);
  yield takeLatest(Types.SIGN_UP, signUp);
  yield takeLatest(Types.SOCIAL_LOGIN, socialLogin);


}
