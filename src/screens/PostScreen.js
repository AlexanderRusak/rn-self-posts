import React, { useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { useSelector, useDispatch } from "react-redux";
import { toggleBooked, removePost } from "../store/actions/post";
import { THEME } from "../theme";

export const PostScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const postId = navigation.getParam("postId");
  const post = useSelector((state) =>
    state.post.allPosts.find((p) => p.id === postId)
  );

  const booked = useSelector((state) =>
    state.post.bookedPosts.some((post) => post.id === postId)
  );
  useEffect(() => {
    navigation.setParams({ booked });
  }, [booked]);

  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(post));
  }, [dispatch, post]);
  useEffect(() => {
    navigation.setParams({ toggleHandler });
  }, [toggleHandler]);

  const removeHandler = () => {
    Alert.alert(
      "Deleting post",
      "Are you sure, that you want to delete the post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            navigation.navigate("Main");
            dispatch(removePost(postId));
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };
  if (!post) {
    return null;
  }
  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button
        onPress={() => removeHandler()}
        title="DELETE"
        color={THEME.DANGER_COLOR}
      />
    </ScrollView>
  );
};

PostScreen.navigationOptions = ({ navigation }) => {
  const postDate = new Date(navigation.getParam("date")).toLocaleDateString();
  const booked = navigation.getParam("booked");
  const toggleHandler = navigation.getParam("toggleHandler");
  const iconName = booked ? "ios-star" : "ios-star-outline";
  return {
    headerTitle: "Post from " + postDate,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title="Book" onPress={toggleHandler} iconName={iconName} />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  textWrap: {
    padding: 10,
  },
  title: {
    fontFamily: "open-regular",
  },
});
