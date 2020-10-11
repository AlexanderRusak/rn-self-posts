import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { Post } from "./Post";

export const PostList = ({ data, onOpen }) => {
  if (!data.length) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.noItems}>No posts yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Post onOpen={onOpen} post={item} />}
        keyExtractor={(post) => post.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  noItems: {
    fontFamily: "open-regular",
    textAlign: "center",
    marginVertical: 10,
    fontSize: 18,
  },
});
