import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { server, showError, showSuccess } from '../common'
import todayImage from '../../assets/imgs/today.jpg'
import CommonStyles from '../commonStyles'
import Task from '../components/Task'
import AddTask from './AddTask'


const initialState = {
    showDoneTask: true,
    visibleTasks: [],
    showAddTask: false,
    tasks: []
}
export default class TaskList extends Component {

    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneTask: savedState.showDoneTask
        }, this.filterTasks)
        this.loadTasks()
    }

    loadTasks = async () => {
        try {
            const maxDate = moment().format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTasks)
        } catch (err) {
            showError(err)
        }
    }
    toggleFilter = () => {
        this.setState({ showDoneTask: !this.state.showDoneTask }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTask) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTasks })
        AsyncStorage.setItem('tasksState', JSON.stringify({
            showDoneTask: this.state.showDoneTask
        }))
    }

    toggleTask = async taskId => {
        try {
            await axios.put(`${server}/tasks/${taskId}/toggle`)
            this.loadTasks()
        } catch (err) {
            showError(err)
        }
    }

    addTask = async newTask => {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informada')
            return
        }

        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.date
            })

            this.setState({ showAddTask: false }, this.loadTasks)
        } catch (err) {
            showError(err)
        }
    }
    
    deleteTask =  async id => {
        try {
            await axios.delete(`${server}/tasks/${id}`)
            this.loadTasks()
        } catch (err) {
            showError(err)
        }
    }
    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container} >
                <AddTask isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({ showAddTask: false })}
                    onSave={this.addTask}
                />
                <ImageBackground style={styles.background} source={todayImage}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTask ? 'eye' : 'eye-slash'}
                                size={20} color={CommonStyles.colors.secondary}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar} >
                        <Text style={styles.title} >Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleTasks} keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} onToggleTask={this.toggleTask} onDeleteTask={this.deleteTask} />} />
                </View>
                <TouchableOpacity style={styles.addButton}
                    onPress={() => this.setState({ showAddTask: true })} activeOpacity={0.7}>
                    <Icon name='plus' size={20} color={CommonStyles.colors.secondary} />
                </TouchableOpacity>
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
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10,

    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: CommonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center',

    }
})