import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

export const AboutScreen = ({}) => {
  return (
    <View style={styles.center}>
      <Text>Lorem ipsum dolor sit amet, consectetur</Text>
      <Text>Lorem ipsum dolor sit amet, consect</Text>
    </View>
  );
};
AboutScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "About",
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
