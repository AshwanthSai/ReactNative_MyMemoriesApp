import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import ListItems from "../Components/ListItem";
import colors from "../config/colors";
import Icon from "../Components/Icon/Icon";
import Storage from "../auth/Storage";


import useAuth from "../auth/useAuth";

function ProfileScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const [profileImage, setProfileImage] = useState(null);

  return (
    <>
      <View style={styles.container}>
        <ListItems
          title={user?.userName}
          subtitle={user?.email}
          image={
            profileImage
              ? { uri: profileImage }
              : require("../assets/profileImageAvatar.png")
          }
        />
      </View>

      <ListItems
        title="Log Out"
        IconComponent={
          <Icon
            iconWithRoundBackground={true}
            name="logout"
            color={colors.white}
            backgroundColor={colors.primary2}
          />
        }
        onPress={async () => {
          await Storage.deleteMoemory();
          logOut();
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  Screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default ProfileScreen;
