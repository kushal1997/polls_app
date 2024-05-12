import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../../lib/supabsee";
import { Redirect } from "expo-router";

const ProfileScreen = () => {
  const { session, user } = useAuth();

  return (
    <View style={{ padding: 10 }}>
      <Text>Profile User Id : {user?.id}</Text>

      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
