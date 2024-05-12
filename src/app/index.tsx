import { Link, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabsee";
import { useAuth } from "./providers/AuthProvider";

// const polls = [{ id: 1 }, { id: 2 }, { id: 3 }];
export default function HomeScreen() {
  const { polls, fetchPolls } = useAuth();
  useEffect(() => {
    fetchPolls();
  }, []);
  return (
    <>
      <Stack.Screen
        options={{
          title: "Polls",
          headerTitleAlign: "center",
          // headerRight: () => (
          //   <Link href={"/polls/new"}>
          //     <Entypo name="squared-plus" size={24} color="black" />
          //   </Link>
          // ),

          //another way to do the above one

          headerRight: () => (
            <Entypo
              onPress={() => router.push("polls/new")}
              name="squared-plus"
              size={24}
              color="black"
            />
          ),
          headerLeft: () => (
            <Entypo
              onPress={() => router.push("/profile")}
              name="user"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <FlatList
        data={polls}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Link href={`/polls/${item.id}`} style={styles.pollContainer}>
            <Text style={styles.pollText}>
              {item.id}: {item.question}
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
