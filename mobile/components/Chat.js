import React, { Component } from "react";
import { Image, StyleSheet, Text, TextInput, View, Button } from "react-native";
import io from "socket.io-client";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: [],
      userName: "",
      backgroundColor2: "#fff",
    };
  }

  componentDidMount() {
    this.socket = io("http://192.168.56.1:5001");
    this.socket.on("chat message", (msg) => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    });
  }

  submitChatMessage() {
    this.socket.emit("chat message", this.state.chatMessage);
    this.setState({ chatMessage: "" });
  }

  render() {
    const chatMessages = this.state.chatMessages.map((chatMessage, index) => (
      <Text key={index}>{chatMessage}</Text>
    ));

    let userName = this.props.route.params.userName;

    return (
      <View style={styles.container}>
        <Image style={styles.tinyLogo} source={require("./logo3.png")} />
        <TextInput
          style={{
            fontSize: 40,
            top: 50,
            color: "#000",
            backgroundColor: this.state.backgroundColor2,
          }}
          inlineImageLeft="search_icon"
          defaultValue="Digite sua mensagem"
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={(chatMessage) => {
            this.setState({ chatMessage });
          }}
        />
        <View style={{ top: 50, color: "#fff" }}>{chatMessages}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff8585",
  },
  title: {
    top: 50,
    color: "#ff4646",
    fontSize: 50,
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: "#FFF",
    position: "absolute",
    left: -120,
    top: -20,
  },
  tinyLogo: {
    height: 150,
  },
});
export default Chat;
