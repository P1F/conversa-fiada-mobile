import React, { Component } from 'react';
import { Button, View, Text, TextInput } from 'react-native';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ""
        }
    }
    
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Digite o seu nome: </Text>
                <TextInput 
                    style={{ width: '50%', height: 30, borderWidth: 2 }}
                    autoCorrect={false}
                    value={this.state.userName}
                    onChangeText={userName => {
                        this.setState({ userName });
                    }}
                />
                <Button
                    title="Entrar"
                    onPress={() => this.props.navigation.navigate('Chat', { userName: this.state.userName })}
                />
            </View>
        );
    }
}

export default Main