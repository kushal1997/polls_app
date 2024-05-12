import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";

const polls = [{ id: 1 }, { id: 2 }, { id: 3 }];
export default function HomeSxreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Polls",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
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
