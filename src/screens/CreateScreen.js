import React, { useState, useRef } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { THEME } from "../theme";
import { useDispatch } from "react-redux";
import { addPost } from "../store/actions/post";
import { PhotoPicker } from "../components/PhotoPicker";

export const CreateScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const imageRef = useRef();
  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text: text,
      img: imageRef.current,
      booked: false,
    };
    dispatch(addPost(post));
    navigation.navigate("Main");
  };

  const photoPickHandler = (uri) => {
    imageRef.current = uri;
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Create New Post</Text>
          <TextInput
            onChangeText={setText}
            style={styles.textarea}
            placeholder="Input post text"
            value={text}
            multiline
          />
          <PhotoPicker onPick={photoPickHandler} />
          <Button
            title="Create post"
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
            disabled={!text}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};
CreateScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Create post",
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Toggle Drawer"
        iconName="ios-menu"
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  ),
});
const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  textarea: {
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "open-regular",
    marginVertical: 10,
  },
});
