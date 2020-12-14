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
    this.setState({ userName: this.props.route.params.userName });
    this.socket = io("http://192.168.56.1:5001");
    this.socket.on("chat message", (msg) => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    });
  }

  submitChatMessage() {
    let msg = {user: this.state.userName, content: this.state.chatMessage};
    this.socket.emit("chat message", msg);
    this.setState({ chatMessage: "" });
  }

  render() {
    const chatMessages = this.state.chatMessages.map((chatMessage, index) => {
      return (
        <Text key={index} style={chatMessage.user === this.state.userName ? {color: "white"} : {color: "black"}}>
          {chatMessage.user}: {chatMessage.content}
        </Text>
      );
    });

    return (
      <View style={styles.container}>
        <Image style={styles.tinyLogo} source={require("./logo3.jpeg")} />
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
        <View style={{ top: 50, color: "#fff" }}>
          {chatMessages}
        </View>
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
    width: "80%",
    height: "30%"
  },
});
export default Chat;
