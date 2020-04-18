import React from 'react'
import {  TouchableOpacity,Platform, ScrollView, View, Text, StyleSheet } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import { Gravatar } from 'react-native-gravatar'
import CommonStyles from '../commonStyles'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'


export default props => {
  const logout = () =>{
    delete axios.defaults.headers.common['Authorization']
    AsyncStorage.removeItem('userData')
    props.navigation.navigate('AuthOrApp')
  }
  
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text  style={styles.title}>Tasks</Text>
        <Gravatar style={styles.avatar}
          options={{
            email: props.navigation.getParam('email'),
            secure: true
          }} />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{props.navigation.getParam('name')}</Text>
        <Text style={styles.email}>{props.navigation.getParam('email')}</Text>
      </View>
      <TouchableOpacity onPress={logout}>
        <View style={styles.logoutIcon} >
          <Icon name='sign-out' size={30} color='#800' />
        </View>
      </TouchableOpacity>
      <DrawerItems {...props} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: '#DDD'
  },
  title:{
    color:'#000',
    fontFamily: CommonStyles.fontFamily,
    fontSize: 30,
    paddingTop: Platform.OS === 'ios' ? 70 : 30,
    padding: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 30,
    margin: 10,
  },
  userInfo:{
    marginLeft:10,
  },
  name:{
    fontFamily: CommonStyles.fontFamily,
    fontSize: 20,
    marginBottom: 5,
    color: CommonStyles.colors.mainText
  },
  email:{
    fontFamily: CommonStyles.fontFamily,
    fontSize: 15,
    color: CommonStyles.colors.subText,
    marginBottom: 10
  },
  logoutIcon:{
    marginLeft:10,
    marginBottom: 10,
  }
})