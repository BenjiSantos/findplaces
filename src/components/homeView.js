'use strict'

import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Platform,
    Image,
    ImageBackground,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar
} from "react-native";

import {
    iOSColors,
    human,
    iOSUIKit,
    systemWeights
} from "react-native-typography";

const TouchableRoundedImage = ({ style, ...props }) => (
    <TouchableOpacity style={style}>
        <ImageBackground
            borderRadius={6}
            style={styles.touchableRoundedImage}
            {...props}
        />
    </TouchableOpacity>
);

const recents = [
    {
        album: "Restaurantes",
        cover: require("../assets/restaurant.jpg")
    },
    {
        album: "Bares - Discotecas",
        cover: require("../assets/bar.jpg")
    },
    {
        album: "Centros comerciales",
        cover: require("../assets/shopping.jpg")
    }
];

const Dashboard = require('./dashboardView');

class homeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };
    }

    dataForm = {
            "location": '',
            "type": 'restaurant',
            "price": '1',
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    render() {
        return (
            <View style={styles.screenContainer}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.header}>
                    <View>
                        {/* <Text style={styles.date}>MONDAY, 27 NOVEMBER</Text>*/}
                        <Text style={iOSUIKit.largeTitleEmphasized}>¿A dónde</Text>
                        <Text style={iOSUIKit.largeTitleEmphasized}>iremos hoy?</Text>
                    </View>
                    {/*  <TouchableOpacity>
                        <Image
                             style={styles.avatar}
                             source={require("../assets/avatar.jpg")}
                         />
                    </TouchableOpacity> */}
                </View>
                <ScrollView contentContainerStyle={styles.body}>
                    <View style={styles.card}>
                        <View style={styles.suggestionRow}>
                            <TouchableRoundedImage
                                style={styles.bigSuggestionWithText}
                                source={require("../assets/green.jpg")}
                            >
                                <View style={styles.suggestionTextBlock}>
                                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Dashboard', {
                                        location: this.state.latitude+','+this.state.longitude,
                                        type: 'restaurant',
                                        price: this.dataForm.price })} style={styles.button}>
                                        <Text style={styles.suggestionText}>
                                            <Text style={[
                                                iOSUIKit.subhead,
                                                styles.textWhite
                                            ]}>¡TÙ          </Text>
                                            <Text style={[
                                                iOSUIKit.subhead,
                                                styles.textWhite
                                            ]}>ELIGES A   </Text>
                                            <Text style={[
                                                iOSUIKit.subhead,
                                                styles.textWhite
                                            ]}>DONDE    </Text>
                                            <Text style={[
                                                iOSUIKit.subhead,
                                                styles.textWhite
                                            ]}>VAMOS HOY!  </Text>
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                            </TouchableRoundedImage>
                            <View style={styles.suggestionColumn}>
                                <TouchableRoundedImage
                                    style={[
                                        styles.smallSuggestion,
                                        styles.smallSuggestionMarginTop
                                    ]}
                                    source={require("../assets/arrow_right.png")}
                                />
                                <TouchableRoundedImage
                                    style={[
                                        styles.smallSuggestion,
                                        styles.smallSuggestionMarginTop
                                    ]}
                                    source={require("../assets/arrow_right.png")}
                                />
                            </View>
                            <TouchableRoundedImage
                                style={styles.bigSuggestionWithText}
                                source={require("../assets/green.jpg")}
                            >
                                <View style={styles.suggestionTextBlock}>
                                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Dashboard', {
                                        location: this.state.latitude+','+this.state.longitude,
                                        type: 'restaurant',
                                        price: this.dataForm.price })} style={styles.button}>
                                        <Text style={styles.suggestionText}>
                                            <Text style={[
                                                iOSUIKit.largeTitleEmphasized,
                                                styles.textWhite
                                            ]}>¡VA          </Text>
                                            <Text style={[
                                                iOSUIKit.largeTitleEmphasized,
                                                styles.textWhite
                                            ]}>MO     </Text>
                                            <Text style={[
                                                iOSUIKit.largeTitleEmphasized,
                                                styles.textWhite
                                            ]}>NOS!</Text>
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                            </TouchableRoundedImage>
                        </View>
                        <Text style={styles.bold}>Cuánto pagarás</Text>
                        <View style={styles.suggestionRowBottom}>
                            <TouchableRoundedImage
                                style={styles.smallSuggestion}
                                source={require("../assets/5_dollars.png")}
                            />
                            <TouchableRoundedImage
                                style={[
                                    styles.smallSuggestion,
                                    styles.smallSuggestionMarginLeft
                                ]}
                                source={require("../assets/10_dollars.png")}
                            />
                            <TouchableRoundedImage
                                style={[
                                    styles.smallSuggestion,
                                    styles.smallSuggestionMarginLeft
                                ]}
                                source={require("../assets/20_dollars.png")}
                            />
                            <TouchableRoundedImage
                                style={[
                                    styles.smallSuggestion,
                                    styles.smallSuggestionMarginLeft
                                ]}
                                source={require("../assets/100_dollars.png")}
                            />

                        </View>
                    </View>
                    <View style={styles.recentlyPlayed}>
                        <View style={styles.recentlyPlayedTitleBar}>
                            <Text style={styles.recentlyPlayedTitle}>En donde quieras estar</Text>
                            <TouchableOpacity>
                                {/* Text style={styles.seeAll}>See All</Text> */}
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            horizontal
                            contentContainerStyle={styles.recentlyPlayedSongList}>
                            {recents.map((recent, index) => (
                                <View key={recent.album} style={index < recents.length - 1 && styles.recentlyPlayedSong}>
                                    <TouchableRoundedImage
                                        style={styles.recentlyPlayedSongCover}
                                        source={recent.cover}
                                    />
                                    <Text style={styles.album}>{recent.album}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textWhite: {
        color: 'white'
    },
    screenContainer: {
        flex: 1,
        backgroundColor: iOSColors.white,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginHorizontal: 16,
        marginTop: 15,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderColor: iOSColors.customGray
    },
    date: {
        ...iOSUIKit.footnoteEmphasizedObject,
        color: iOSColors.gray
    },
    avatar: {
        height: 43,
        width: 43,
        borderRadius: 43 / 2
    },
    body: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch"
    },
    card: {
        marginTop: 24,
        marginHorizontal: 16,
        padding: 12,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: iOSColors.white,
        borderRadius: 6,
        ...Platform.select({
            android: { elevation: 16 },
            ios: {
                shadowColor: "black",
                shadowOffset: {
                    width: 0,
                    height: 16
                },
                shadowOpacity: 0.2,
                shadowRadius: 16
            }
        })
    },
    suggestionRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch"
    },
    suggestionRowBottom: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch",
        marginTop: 4
    },
    bigSuggestion: {
        flex: 2,
        aspectRatio: 1
    },
    bigSuggestionWithText: {
        flex: 2,
        aspectRatio: 1,
        justifyContent: "space-between",
        margin: 1
    },
    suggestionText: {
        ...human.headlineWhiteObject,
        ...systemWeights.light,
        margin: 8,
        marginTop: 10
    },
    bold: {
        ...systemWeights.bold,
        marginLeft: 120,
        marginTop: 5,
        marginBottom: 5
    },
    updatedFriday: {
        ...human.caption2Object,
        color: "rgba(255,255,255,0.80)",
        margin: 8
    },
    suggestionColumn: {
        flex: 1,
        marginHorizontal: 4,
        aspectRatio: 0.5,
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    smallSuggestion: {
        flex: 1,
        aspectRatio: 1
    },
    smallSuggestionMarginTop: {
        marginTop: 4
    },
    smallSuggestionMarginLeft: {
        marginLeft: 4
    },
    recentlyPlayedTitle: {
        ...human.title2Object,
        ...systemWeights.bold
    },
    recentlyPlayed: {
        marginTop: 25,
        paddingTop: 16,
        backgroundColor: iOSColors.white
    },
    recentlyPlayedTitleBar: {
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    seeAll: {
        ...iOSUIKit.bodyEmphasizedObject,
        color: iOSColors.pink
    },
    recentlyPlayedSongList: {
        marginTop: 12,
        paddingHorizontal: 16,
        paddingBottom: 12
    },
    recentlyPlayedSong: {
        marginRight: 8
    },
    recentlyPlayedSongCover: {
        height: 160,
        width: 160,
        borderRadius: 6
    },
    album: {
        ...human.footnoteObject,
        marginTop: 5
    },
    author: {
        ...human.footnoteObject,
        color: iOSColors.gray
    },
    touchableRoundedImage: {
        flex: 1,
        height: undefined,
        width: undefined,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start"
    }
});

module.exports = homeView;