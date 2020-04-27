import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class AsteroidDetailScreen extends React.PureComponent {

    render() {
        const { data } = this.props.route.params;
        return (
            <View style={styles.container}>
                <View style={styles.displayDataContainer}>
                    <Text>Asteroid name : {data.name}</Text>
                    <Text>URL : {data.nasa_jpl_url}</Text>
                    <Text>Dangerious : {data.is_potentially_hazardous_asteroid ? 'YES' : 'NO'}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    displayDataContainer: {
        width: '99%',
        padding: 10,
        marginTop: 20,
        alignSelf: 'center',
        height: 'auto',
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 1
    }
});