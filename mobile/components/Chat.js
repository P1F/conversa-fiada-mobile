import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import io from 'socket.io-client';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: [],
      userName: ""
    }
  }

  componentDidMount() {
    this.socket = io("http://192.168.56.1:5001");
    this.socket.on("chat message", msg => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    })
  }

  submitChatMessage() {
    this.socket.emit("chat message", this.state.chatMessage);
    this.setState({ chatMessage: "" });
  }

  render(){
    const chatMessages = this.state.chatMessages.map((chatMessage, index) => (
        <Text key={index}>{chatMessage}</Text>
    ));
    
    let userName = this.props.route.params.userName;

    return (
      <View style={styles.container}>
        <TextInput 
          style={{ height: 40, borderWidth: 2 }}
          autoCorrect={false}
          onSubmitEditing={() => this.submitChatMessage()}
          value={this.state.chatMessage}
          onChangeText={chatMessage => {
            this.setState({ chatMessage });
          }}
        />
        {chatMessages}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Chat