'use strict'
import React, { Component } from 'react';

import {
  Text,
    View,
    TouchableHighlight,
    Alert,
    StyleSheet,
    ListView,
    Image
} from 'react-native';

var Crypto = require('crypto-js')
var ComicDetail = require('./comicDetailView');

const REQUEST_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-12.084614,-77.0467251&rankby=distance&types=shopping_mall&key=AIzaSyBUc8RxvF1v7am_36kC0HRA4Mk0WcaQcQs"

class dashboardView extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1,row2) => row1 !== row2
            }),
            loaded: false 
        }
    }
    
    componentDidMount(){
        this.getPlaceFromApiAsync();
    }
    /*
        Get data since Google Place Api
        and convert to Json format
     */
    getPlaceFromApiAsync() {
        return fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseJson) => {
            console.log(responseJson.results)
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseJson.results),
                    loaded: true
                })
                return responseJson.copyright;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    renderLoadingView(){
        return(
        <View style= {styles.container}>
            <Text style={{}}>Cargando lugares....</Text>
        </View>)
    }
    renderPlace(place){
        return(
        <TouchableHighlight>
            <View style={styles.rightContainer}>
                <Text style={styles.title}>{place.name}</Text>
                <Text style={styles.available}></Text>
                <Image
                    style={{width: 66, height: 58}}
                    source={{uri: place.icon}}
                />
            </View>
        </TouchableHighlight>)
    }

    /*
        Function with validation, for
        show message as charge after show the information.
     */
    render(){
        if(!this.state.loaded){
            return this.renderLoadingView();
        }
        return(
            <ListView dataSource= {this.state.dataSource}
            renderRow= {this.renderPlace.bind(this)}
            style= {styles.listview}></ListView>
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
    backgroundImage:{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 150
    },
    rightContainer: {
        backgroundColor: 'rgba(52,52,52,0.5)', 
        alignSelf: 'stretch',
        paddingTop: 30,
        height: 150
    },
    title:{
        fontSize: 27,
        marginBottom: 8,
        textAlign: 'center',
        color: '#FFF',
        backgroundColor: 'rgba(52,52,52,0)'
    },
    available: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FFF',
        backgroundColor: 'rgba(52,52,52,0)'
    },
    listView:{
        paddingTop: 64,
        marginBottom: 49
    }
})


module.exports = dashboardView;

