import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const polls = [{ id: 1 }, { id: 2 }, { id: 3 }];
export default function HomeScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Polls",

          headerRight: () => (
            <Link href={"/polls/new"}>
              <Entypo name="squared-plus" size={24} color="black" />
            </Link>
          ),
        }}
      />
      <FlatList
        data={polls}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Link href={`/polls/${item.id}`} style={styles.pollContainer}>
            <Text style={styles.pollText}>
              {item.id}: Example Poll Question
            </Text>
          </Link>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 10,
    gap: 5,
  },
  pollContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  pollText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
