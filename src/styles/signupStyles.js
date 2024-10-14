import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },

  logo: {
    width: '100%',
    top: -300,
    height: 250,
    resizeMode: 'contain',
  },

  
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  account: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    height: 550,
    top: 50,
    borderTopLeftRadius: 100,
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
  },

  inputConLogIn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  input: {
    height: 50,
    margin: 10,
    backgroundColor: '#CCCCCC',
    width: '80%',
    paddingLeft: 20,
    borderRadius: 50,
    borderBottomWidth: 3,
    borderBottomColor: '#7B73FF',
  },

  title: {
    color: '#2F2E41',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },

  customBotton: {
    backgroundColor: '#2F2E41',
    borderRadius: 50,
    padding: 5,
    width: '80%',
    marginTop: 50,
    height: 50,
    justifyContent: 'center',
  },

  textt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'center',
  },

  signupContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'center',
  },

  signText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'normal',
  },

  signupLink: {
    fontWeight: 'bold',
    color: '#7B73FF',
    marginLeft: 8,
  },
});

export default styles;