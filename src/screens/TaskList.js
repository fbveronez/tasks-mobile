import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, ShadowPropTypesIOS } from 'react-native'
import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment'
import 'moment/locale/pt-br'
import CommonStyles from '../commonStyles'
import Task from '../components/Task'

export default class TaskList extends Component {

    state = {
        tasks: [{
            id: Math.random(),
            desc: "Comprar livro de React Native",
            estimateAt: new Date(),
            doneAt: new Date(),
        }, {
            id: Math.random(),
            desc: "Ler livro de React Native",
            estimateAt: new Date(),
            doneAt: null,
        }]
    }

    toggleTask = taskId =>{
        const tasks = [...this.state.tasks]
        tasks.forEach(task =>{
            if(task.id === taskId){
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({tasks})
    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container} >
                <ImageBackground style={styles.background} source={todayImage}>
                    <View style={styles.titleBar} >
                        <Text style={styles.title} >Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.tasks} keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: CommonStyles.fontFamily,
        color: CommonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
    },
    subtitle: {
        fontFamily: CommonStyles.fontFamily,
        color: CommonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    }
})