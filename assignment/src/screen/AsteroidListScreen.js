import React from 'react';
import { ActivityIndicator, View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';

import * as Constants from '../constant';

export default class AsteroidListScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    callAPI = (action, asetroidId) => {
        let url;
        if (action == 'known') {
            url = Constants.BASE_URL + asetroidId + '?api_key=' + Constants.API_KEY;
        }

        this.setState({ isLoading: true })
        const api = fetch(
            url
        );
        api.then((response) => response.json().then(json => ({ json, response })))
            .then((json) => {
                this.setState({ isLoading: false })
                if (action == 'known') {
                    this.props.navigation.navigate('AsteroidDetailScreen', { data: json.json })
                }
            })
            .then(response => { console.log(response) }, error => { console.log(error); this.setState({ isLoading: false }); alert("Server Error") });
    }

    renderAsteroid() {
        return (
            <View>
                <FlatList
                    data={this.props.route.params.data}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <View style={{ width: '99%', marginBottom: 5, padding: 10, alignSelf: 'center', height: 'auto', borderRadius: 5, borderColor: 'grey', borderWidth: 1 }}>
                            <TouchableOpacity onPress={() => { this.callAPI('known', item.id) }}>
                                <Text style={styles.displayText}>Asteroid Name : {item.name}</Text>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 5 }}>Asteroid ID : {item.id}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        )
    }

    render() {
        return (
            <>
                {this.state.isLoading ? <View style={styles.loader}>
                    <ActivityIndicator size="large" />
                </View>
                    :
                    <View style={styles.container}>
                        {this.renderAsteroid()}
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
    loader: {
        flex: 1,
        justifyContent: "center",
        padding: 10
    },
    displayText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 5
    }
});