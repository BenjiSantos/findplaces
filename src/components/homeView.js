'use strict'

import React, { Component } from 'react'

import {
    Text,
    View,
    TouchableHighlight,
    Alert,
    StyleSheet,
    Button,
    Image
} from 'react-native'

const Dashboard = require('./dashboardView');


class homeView extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text>A donde vamos hoy causa!</Text>
                <Button onPress={() => this.props.navigation.navigate('Dashboard')} title="Buscar"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 100
    },

})

module.exports = homeView;