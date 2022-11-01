import { View, StyleSheet, Dimensions } from 'react-native';
import Color from './Color';
import Constant from './Constant';

export default StyleSheet.create({
  notification: {
    paddingStart: 15, height: "100%",
    justifyContent: "center",
  },
  notifImg: {
    tintColor: Color.white,
    height: 28, width: 28,
    resizeMode: "contain"
  },
  badge: {
    backgroundColor: "yellow",
    position: "absolute",
    padding: 3, borderRadius: 10,
    paddingHorizontal: 5,
    top: 5
  },
  cardView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dialCode: {
    width: 50,
    height: 45,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  inputBox: {
    width: Constant.width - 64,
    height: 45,
    backgroundColor: Colors.bgGray,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    // marginTop: 30,
    overflow: 'hidden',
  },
  mikeButton: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 35,
    right: 20,
    backgroundColor: Color.theme,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  img: {
    height: '100%',
    width: Dimensions.get('window').width,
    resizeMode: 'stretch',
  },
  submit: {
    backgroundColor: Color.theme,
    width: 100,
    height: 45,
    borderColor: 'black',
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 45,
    flex: 1,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 5,
  },
  header: {
    height: 50,
    width: '100%',
    backgroundColor: Color.theme,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  drawerButton: {
    width: 55,
    height: 50,
    position: 'absolute',
    color: '#fff',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'normal',
    fontSize: 18,
    color: Color.white,
    letterSpacing: 1,
  },
  safeArea: { backgroundColor: Color.theme, width: '100%' },
  center: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  containerDashboard: {
    flex: 1,
    backgroundColor: Color.bgGray,
  },
  sideIcon: { width: 28, height: 15, tintColor: Color.white },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: '#eeeeee',
  },
  underlineStyleBase: {
    width: 60,
    height: 60,
    borderRadius: 14,
    borderWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#eeeeee',
    color: '#3cb244',
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  headerDashboard: {
    height: 70,
    width: '100%',
    backgroundColor: Color.theme,
    justifyContent: 'center',
    paddingStart: 20,
    paddingEnd: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerCol: {
    flexDirection: 'column',
  },
  headerRightRow: {
    flexDirection: 'row',
    paddingStart: 40,
    height: "100%",
    alignItems: "center"
  },
  profileIcon: {
    width: 45,
    height: 45,
    borderRadius: 20,
  },
  rightHeaderIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  helpSpacing: { paddingStart: 15, paddingEnd: 15 },
  starIcon: {
    width: 20,
    height: 20,
  },
  pointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginStart: 10,
    marginBottom: 10,
  },
  winnerlayout: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginStart: 10,
    marginBottom: 10,
    width: 200,
  },
  pointTypesContainer: {
    backgroundColor: Color.white,
    height: 160,
    borderRadius: 7,
    borderColor: Color.darkBGgray,
    marginStart: 1,
    marginEnd: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
    marginBottom: 15,
  },
  pointTypesContainerreward: {
    backgroundColor: Color.theme,
    height: 160,
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 2,
    borderColor: Color.darkBGgray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
    marginBottom: 15,
  },
  rewardcontainer: {
    backgroundColor: Color.white,
    height: 125,
    borderRadius: 7,
    marginTop: 10,
    borderColor: Color.darkBGgray,
    marginEnd: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
    marginBottom: 15,
  },
  winnercontainer: {
    backgroundColor: Color.white,
    height: 130,
    width: Constant.width / 3.3,
    margin: 3,
    borderRadius: 7,
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: Color.border,
    elevation: 3,
  },
  pointwoncontainer: {
    backgroundColor: Color.white,
    height: 175,
    width: 150,
    margin: 12,
    borderWidth: 1,
    borderColor: Color.border,
    // borderRadius: 15,
    // shadowColor: '#000',
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 100,
    // shadowRadius: 1,
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    // shadowRadius: 20,
    // shadowColor: Color.bgGray,
    // marginHorizontal: 10,
    // marginVertical: 10,
  },
  winnercontainerfull: {
    width: Constant.width - 16,
    backgroundColor: Color.white,
    height: 100,
    margin: 3,
    borderRadius: 7,
    paddingTop: 20,
    flexDirection: 'row',
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: Color.border,
    elevation: 3,
    // justifyContent:"center"
  },
  pointTypeCol: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  pointTypeColMiddle: {
    flex: 1,
    borderRightWidth: 0.3,
    borderLeftWidth: 0.3,
    borderColor: Color.darkBGgray,
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 10,
    marginStart: 10,
    alignItems: 'center',
  },
  point_border_container: {
    height: 135,
    marginTop: -90,
    borderRightWidth: 0.3,
    borderColor: Color.darkBGgray,
  },
  rewardmiddle: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 10,
    marginStart: 10,
    alignItems: 'center',
  },
  pointIcon: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
  },
  rewardimage: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  winnerimage: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
  },
  qrContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
  },
  qrIcon: {
    height: 140,
    width: 140,
  },
  slideImg: {
    width: 350,
  },
  slide: {
    height: 200,
  },
  scrollViewContainerStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSlider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  congratIcon: {
    height: 100,
    width: 100,
  },
  starIconSuccess: {
    width: 40,
    height: 40,
  },

  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginStart: 10,
    marginBottom: 10,
  },
  menuIcon: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  menuTypeContainer: {
    backgroundColor: Color.white,
    height: 175,
    borderRadius: 7,
    // borderColor: Color.darkBGgray,
    // marginStart: 20,
    // marginEnd: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
    marginBottom: 15,
    // borderTopColor: Color.bgGray,
    // borderBottomColor: Color.bgGray,
    // borderTopWidth: 0.3,
    // borderBottomWidth: 0.3,
    borderColor: Color.darkBGgray,
    // marginVertical: 20,
  },
  menuTypeColMiddle: {
    flex: 1,

    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 10,
    marginStart: 10,
    alignItems: 'center',
  },
});