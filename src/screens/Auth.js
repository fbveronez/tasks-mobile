import React, {Component} from 'react'
import {ImageBackground,Text,StyleSheet} from 'react-native'
import backgoundImage from '../../assets/imgs/login.jpg'
import CommonStyles from '../commonStyles'

export default class Auth extends Component {
  render(){
    return (
      <ImageBackground source={backgoundImage} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    width:'100%',
    alignItems:'center',
    justifyContent: 'center'
  },
  title:{
    fontFamily: CommonStyles.fontFamily,
    color: CommonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
  }
})