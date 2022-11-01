import Toast from 'react-native-simple-toast';

function showResponse(response) {
  if (response && response.message && !response.message.includes("Data") && !response.message.includes("Found")) {
    setTimeout(() => {
      Toast.showWithGravity(response.message, Toast.SHORT, Toast.BOTTOM);
    }, 2500);
  }
}

function showToast(message) {
  Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
}

function showToastLong(message) {
  Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
}

function showToastCenter(message) {
  Toast.showWithGravity(message, Toast.LONG, Toast.CENTER);
}

export { showResponse, showToast , showToastLong, showToastCenter};
