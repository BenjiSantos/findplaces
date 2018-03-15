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

import {
    iOSColors,
    human,
    iOSUIKit,
    systemWeights
} from "react-native-typography";

const REQUEST_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const KEY = "AIzaSyBUc8RxvF1v7am_36kC0HRA4Mk0WcaQcQs";

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
        const PARAMS = this.props.navigation.state.params;
        const LOCATION = PARAMS ? PARAMS.location : null;
        const TYPE = PARAMS ? PARAMS.type : null;
        const PRICE = PARAMS ? PARAMS.price : null;

        return fetch(REQUEST_URL+'?location='+LOCATION+'&rankby=distance&types='+TYPE+'&key='+KEY)
            .then((response) => response.json())
            .then((responseJson) => {
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
        <TouchableHighlight style={styles.container}>
            <View style={styles.container}>
                <Image
                    style={styles.iconLeft}
                    source={{uri: ('data:image/jpeg;base64,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')}}
                />
                <View style={styles.descriptionRight}>
                    <Text style={[human.title1, styles.text]}>{place.name}</Text>
                    <Text style={styles.text}>Lugar conocido por su comodidad y precios bajos, agradable ambiente para compartir.</Text>
                    <Text style={styles.text}>{place.vicinity}</Text>

                </View>
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
            renderRow= {this.renderPlace.bind(this)}></ListView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 3
    },
    descriptionRight: {
        flex: 2,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconLeft: {
        flex: 1,
        alignSelf: 'flex-start',
        margin: 15,
        height: 100,
        borderRadius: 20
    },
    text: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})


module.exports = dashboardView;

