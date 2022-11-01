import { Dimensions } from 'react-native';
const baseUrl = 'https://zzzdevfrontend.divisapp.com/';
export default Constants = {
  API_URL: baseUrl + 'api/v1/',
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  s3Url:baseUrl+"/storage/",
  dollarImg:'https://zzzdevfrontend.divisapp.com/images/common/app/btn_v3.png'
};
