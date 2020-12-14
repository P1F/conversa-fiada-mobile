import React, { Component } from "react";
import { Image, Button, View, Text, TextInput, StyleSheet } from "react-native";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "#ff8585",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.circle} />
        <Image style={styles.tinyLogo} source={require("./logo.png")} />
        <Text style={{ color: "#000" }}>Digite o seu nome: </Text>
        <TextInput
          style={{ width: "50%", height: 30, borderWidth: 2 }}
          autoCorrect={false}
          color="#000"
          value={this.state.userName}
          onChangeText={(userName) => {
            this.setState({ userName });
          }}
        />
        <Button
          color="#ffb396"
          title="Entrar"
          onPress={() =>
            this.props.navigation.navigate("Chat", {
              userName: this.state.userName,
            })
          }
        />
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
    color: "#fff",
    fontSize: 40,
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
    width: 300,
    height: 300,
    alignSelf: "center",
  },
});

export default Main;
