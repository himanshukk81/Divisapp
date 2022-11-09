import Constants from '../utility/Constant';
import { BackHandler ,AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

async function callApi(urlString, body, methodType) {
  console.log('-----------AXIOS  Api request is----------- ');
  console.log('url string ' + urlString);
  console.log('methodType ' + methodType);
  const accessToken = await AsyncStorage.getItem('access_token');
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + accessToken
    // 'Authorization': accessToken
  };
  let options = {
    method: methodType,
    headers,
  };
  if(methodType == 'GET'){
     options = {
      method: methodType,
      headers:{
        'Authorization': 'Bearer ' + accessToken        
      },
    };
  }

  if (methodType == 'POST' || methodType == 'PUT') {
    options.body = {};
    if (body) {
      options.body = JSON.stringify(body);
    }
  }

  console.log({options333:options});
  console.log(JSON.stringify(options));
  try {
    const response = await fetch(urlString, options);
    const jsonResposne = await response.json();

    console.log(JSON.stringify(jsonResposne));
    if (jsonResposne && jsonResposne.status && jsonResposne.status == 100) {
      Toast.showWithGravity(
        'Your account has been suspended . . .',
        Toast.SHORT,
        Toast.BOTTOM,
      );
      setTimeout(() => {
        BackHandler.exitApp();
      }, 1000);
    } else {
      console.log(jsonResposne);
      return jsonResposne;
    }
  } catch (error) {
    console.log("eee=="+error)
    return error;
  }
}

async function callFetchApi(urlString, body, methodType) {
  console.log('-----------AXIOS  Api request is----------- ');
  console.log('url string ' + urlString);
  console.log('methodType ' + methodType);
  const accessToken = await AsyncStorage.getItem('access_token');
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + accessToken
  };
  let options = {
    method: methodType,
    headers,
  };
  if(methodType == 'GET'){
     options = {
      method: methodType,
      headers:{
        'Authorization': 'Bearer ' + accessToken
      },
    };
  }

  if (methodType == 'POST' || methodType == 'PUT') {
    options.body = {};
    if (body) {
      options.body = JSON.stringify(body)
    }
  }
  try {
    const response = await fetch(urlString, options);
    console.log("ss0999");
    console.log(JSON.stringify(response));
    const jsonResposne = await response.json();

    console.log({jsonResposnehh:jsonResposne});
    console.log(JSON.stringify(jsonResposne));

    if (jsonResposne && jsonResposne.status && jsonResposne.status == 100) {
    
    } else {
      return jsonResposne;
    }
  } catch (error) {
    console.log("erroddr:",error);
    return error;
  }
}
export function userAccounts(body) {
  console.log('----------User Account Api Call ------------------');
  return callApi(Constants.API_URL + 'user-accounts', {}, 'GET');
}

export function userAccountCreate(body) {
  console.log('----------User Account Api Call ------------------');
  return callApi(Constants.API_URL + 'user-accounts', body, 'POST');
}

export function userAccountUpdate(body) {
  console.log('----------User Account Update Call ------------------');
  return callApi(Constants.API_URL + 'thirds/'+body.accountId, body, 'PUT');
}

export function userAccountRemove(body) {
  console.log('----------User Account Remove Call ------------------');
  return callApi(Constants.API_URL + 'user-accounts/'+body.id+'/remove', {}, 'PUT');
}

export function userCreditCard(body) {
  console.log('----------User CreditCard Api Call ------------------');
  return callApi(Constants.API_URL + 'user-ccs', body, 'POST');
  // return callApi(Constants.API_URL + 'operationapicalc', body, 'POST');
}

export function userBankFetch(body) {
  console.log('----------User Banks Api Call ------------------');
  return callApi(Constants.API_URL + 'banks',{}, 'GET');
}

export function userCreditCards(body) {
  console.log('----------User Credits Api Call ------------------');
  return callApi(Constants.API_URL + 'user-ccs',{}, 'GET');
}

export async function getProfileInfo(body) {
  console.log('----------User Credits Api Call ------------------');
  const user = await AsyncStorage.getItem('user');
  let userParse = JSON.parse(user);
  return callApi(Constants.API_URL + 'profiles/'+userParse.id,'', 'GET');
}

export async function removeBankApi(body) {
  console.log('----------User bank remove Api Call ------------------');
  return callApi(Constants.API_URL + 'user-accounts/'+body.id+'/remove','', 'PUT');
}

export async function removeCCApi(body) {
  console.log('----------USer CC remove Api Call ------------------');
  return callApi(Constants.API_URL + 'user-ccs/'+body.id+'/remove','', 'PUT');
}

// calculate currency 

export async function calculateCurrency(params) {
  console.log('----------calculate currency ------------------');
  // return callApi(Constants.API_URL + 'operatioapincalc/?'+params,'', 'GET');
  return callFetchApi(Constants.API_URL + 'operationapicalc',params, 'POST');
}


export async function registerForOperations(params) {
  console.log('----------Register for operations------------------');
  return callFetchApi(Constants.API_URL + 'operations',params, 'POST');
}

export async function getOperationList() {
  console.log('----------Get Operations services------------------');
  return callFetchApi(Constants.API_URL + 'operations',{}, 'GET');
}
export async function getOperations(operationId) {
  console.log('----------Get Operations services------------------');
  return callFetchApi(Constants.API_URL + 'operations/'+operationId,{}, 'GET');
}

export async function uploadMedia(params) {
  console.log('----------upload meadia services------------------');
  return callFetchApi(Constants.API_URL + 'operation-transfers/media',params, 'POST');
}

export async function updateOperationTransfer(params) {
  console.log('----------update Transfer services------------------');
  return callFetchApi(Constants.API_URL + 'operation-transfers',params, 'POST');
}

export async function cancelOperationServices(operationId) {
  console.log('----------Cancel Operation services------------------');
  return callFetchApi(Constants.API_URL + 'operations/'+operationId+"/cancel",{}, 'POST');
}

export async function faqCategories() {
  console.log('----------FAQ Categorires------------------');
  return callFetchApi(Constants.API_URL + 'faq-categories',{}, 'GET');
}


export async function faqQuestions() {
  console.log('----------FAQ Questions------------------');
  return callFetchApi(Constants.API_URL + 'faq-questions',{}, 'GET');
}

export async function updatePass(parms) {
  console.log('----------Change Password------------------');
  console.log({parms:parms});
  return callApi(Constants.API_URL + 'password_update',parms, 'POST');
}

export async function getRates() {
  console.log('----------Get Rates------------------');
  return callApi(Constants.API_URL + 'rates',{}, 'GET');
}
