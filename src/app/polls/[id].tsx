import {
  ActivityIndicator,
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../../lib/supabsee";

const PollDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState("");

  const vote = () => {
    console.warn("Vote", selected);
  };
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const { data, error } = await supabase
          .from("polls")
          .select("*")
          .eq("id", Number.parseInt(id))
          .single();

        if (error) {
          throw new Error("Error fetching data");
        }

        if (data) {
          setPoll(data);
        }
      } catch (error) {
        Alert.alert("Error fetching data");
      }
    };
    fetchPolls();
  }, []);
  if (!poll) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Poll Voting" }} />
      <Text style={styles.question}>{poll.question}</Text>
      <View style={{ gap: 5 }}>
        {poll.options.map((option, i) => (
          <Pressable
            onPress={() => setSelected(option)}
            key={i}
            style={styles.optionContainer}
          >
            <Feather
              name={option === selected ? "check-circle" : "circle"}
              size={18}
              color={option === selected ? "green" : "gray"}
            />
            <Text>{option}</Text>
          </Pressable>
        ))}
      </View>
      <Button onPress={vote} title="Vote" />
    </View>
  );
};

export default PollDetails;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
  },
  optionContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
