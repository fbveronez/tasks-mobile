import React, { Component } from 'react'
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert
} from 'react-native'
import backgoundImage from '../../assets/imgs/login.jpg'
import CommonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'

export default class Auth extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false,
  }

  signinOrSigup = () =>{
    if(this.state.stageNew){
      Alert.alert('Sucesso', 'Criar Conta')
    }else{
      Alert.alert('Sucesso', 'Logar')
    }
  }

  render() {
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
          <TouchableOpacity onPress={this.signinOrSigup}>
            <View style={styles.button}>
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