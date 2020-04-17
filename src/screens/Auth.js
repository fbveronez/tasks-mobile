import React, { Component } from 'react'
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert
} from 'react-native'
import axios from 'axios'
import backgoundImage from '../../assets/imgs/login.jpg'
import CommonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'
import { server, showError, showSuccess} from '../common'

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  stageNew: false,
}
export default class Auth extends Component {

  state = {
    ...initialState
  }

  signinOrSigup = () =>{
    if(this.state.stageNew){
      this.signup()
    }else{
      this.signin()
    }
  }

  signup = async () =>{
    try {
      await axios.post(`${server}/signup`, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      })
      showSuccess('Usuário cadastrado!')
      this.setState({...initialState})
    } catch (err) {
      showError(err)
    }
  }

  signin = async () =>{
    try {
      const res = await axios.post(`${server}/signin`, {
        email: this.state.email,
        password: this.state.password
      })

      axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
      this.props.navigation.navigate('Home')
    } catch (err) {
      showError(err)
    }

  }
  render() {

    const validations = []
    validations.push(this.state.email && this.state.email.includes('@'))
    validations.push(this.state.password && this.state.password.length >= 6)

    if(this.state.stageNew){
      validations.push(this.state.name && this.state.name.trim().length >= 3)
      validations.push(this.state.confirmPassword  === this.state.password)
    }
    const validForm = validations.reduce((total, actual) => total && actual)
    return (
      <ImageBackground source={backgoundImage} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            {this.state.stageNew ? 'Crie a sua Conta' : 'Informe seus Dados'}
          </Text>
          {this.state.stageNew &&
            <AuthInput icon='user' placeholder="Nome" value={this.state.name}
              style={styles.input} onChangeText={name => this.setState({ name })} />
          }
          <AuthInput icon='at' placeholder="Email" value={this.state.email}
            style={styles.input} onChangeText={email => this.setState({ email })} />
          <AuthInput icon='lock'placeholder="Senha" value={this.state.password}
            style={styles.input} secureTextEntry={true} onChangeText={password => this.setState({ password })} />
          {this.state.stageNew &&
            <AuthInput icon='asterisk' placeholder="Confirmação de Senha" value={this.state.confirmPassword}
              style={styles.input} secureTextEntry={true} onChangeText={confirmPassword => this.setState({ confirmPassword })} />
          }
          <TouchableOpacity onPress={this.signinOrSigup} disabled={!validForm}>
            <View style={[styles.button, validForm ? {} : {backgroundColor: '#AAA'}]}>
              <Text style={styles.buttonText}>
                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{padding: 10}} onPress={()=> this.setState({stageNew: !this.state.stageNew})}>
          <Text style={styles.buttonText}>
            {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
          </Text>
        </TouchableOpacity>
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
  subtitle:{
    fontFamily: CommonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    width: '90%',
  },
  input: {
    marginTop: 10,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: CommonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
  }
})