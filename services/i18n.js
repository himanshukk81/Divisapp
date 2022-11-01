// import i18n from 'i18n-js';
import I18n from 'react-native-i18n';

import en from '../translations/en.json';
import hn from '../translations/hn.json';
import ur from '../translations/ur.json';
import pu from '../translations/pu.json';
import ba from '../translations/ba.json';
import {store} from '../redux/store';

const state = store.getState();
I18n.fallbacks = true;
I18n.translations = {en, hn, ur, pu, ba};

export default I18n;
