import React, { Component } from 'react'
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native'
import backgoundImage from '../../assets/imgs/login.jpg'
import CommonStyles from '../commonStyles'

export default class Auth extends Component {

  state ={
    email:'',
    password: '',
  }

  render() {
    return (
      <ImageBackground source={backgoundImage} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <TextInput placeholder="Email" value={this.state.email}
          style={styles.input} onChangeTex={email => this.setState({email})} />
          <TextInput placeholder="Senha" value={this.state.password}
          style={styles.input} onChangeTex={password => this.setState({password})} />
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: CommonStyles.fontFamily,
    color: CommonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
  },
  formContainer:{
    backgroundColor:'rgba(0,0,0,0.8)',
    padding:20,
    width:'90%',


  },
  input:{
    marginTop: 10,
    backgroundColor: '#FFF',
    padding: Platform.OS == 'ios' ? 20 : 10,
  },
  button:{
    backgroundColor:'#080',
    marginTop:10,
    padding:10,
    alignItems:'center'
  },
  buttonText:{
    fontFamily: CommonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
  }
})