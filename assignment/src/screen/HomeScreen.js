import React from 'react';
import { ActivityIndicator, View, StyleSheet, Text, Button, TextInput } from 'react-native';

import * as Constants from '../constant'

export default class HomeScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            asteroidId: '',
            isDataEmpty: false
        };
    }

    callAPI(action) {
        let url;
        if (action == 'known') {
            url = Constants.BASE_URL + this.state.asteroidId + '?api_key=' + Constants.API_KEY;
        } else if (action == 'random') {
            url = Constants.BASE_URL + 'browse?api_key=DEMO_KEY';
        }
        this.setState({ isLoading: true })
        const api = fetch(
            url
        );
        api.then((response) => response.json().then(json => ({ json, response })))
            .then((json) => {
                this.setState({ isLoading: false })
                debugger
                if (action == 'known') {
                    this.props.navigation.navigate('AsteroidDetailScreen', { key: 'known', data: json.json })
                } else {
                    this.props.navigation.navigate('AsteroidListScreen', { key: 'random', data: json.json.near_earth_objects });
                }
                this.setState({ asteroidId: '' });
            })
            .then(response => { console.log(response) }, error => { debugger; console.log(error); this.setState({ isLoading: false, isDataEmpty: true }); });
    }

    getAsteroidData() {
        this.callAPI('known');
    }

    render() {
        return (
            <>
                {this.state.isLoading ? <View style={styles.loader}>
                    <ActivityIndicator size="large" />
                </View>
                    :
                    <View style={styles.container}>
                        <View style={styles.content}>
                            <View style={{ width: '90%' }}>
                                <TextInput
                                    style={{
                                        height: 40, borderBottomColor: '#000000',
                                        borderBottomWidth: 1, marginBottom: 20
                                    }}
                                    placeholder={"Enter Asteroid ID"}
                                    onChangeText={text => this.setState({ asteroidId: text })}
                                    value={this.state.asteroidId}
                                />
                                <Button
                                    title="Submit"
                                    onPress={() => this.getAsteroidData()}
                                    disabled={!this.state.asteroidId.length ? true : false}
                                />
                                <View style={{ paddingTop: 20 }}>
                                    <Button
                                        title="Random Asteroid"
                                        onPress={() => this.callAPI('random')}
                                    />
                                </View>
                            </View>
                        </View>
                        {this.state.isDataEmpty &&
                            <View style={{ flex: 0.3, alignItems: 'center' }}>
                                <Text style={{ fontSize: 20 }}>No Record Found</Text>
                            </View>}
                    </View>

                }
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        padding: 10
    },

});