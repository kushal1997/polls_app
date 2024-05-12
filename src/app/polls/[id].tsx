import {
  ActivityIndicator,
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../../lib/supabsee";
import { useAuth } from "../providers/AuthProvider";
import { Vote } from "../../types/db";
import { BarChart } from "react-native-gifted-charts";
import randomColor from 'randomcolor';
interface BarChartData {
  name: string;
  value: number;
  color?: string; // Optional color property
}
const PollDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [poll, setPoll] = useState(null);
  const { user, isAuthenticaed } = useAuth();
  const [selected, setSelected] = useState("");
  const [userVote, setUserVote] = useState<Vote>(null);
  const [votes, setVotes] = useState([]);
  const [optionCounts, setOptionCounts] = useState<{
    [option: string]: number;
  }>({});
  const [processedData, setProcessedData] = useState<
  { label: string; value: number; color: string }[]
>([]);
  useEffect(() => {
    if (votes) {
      const counts: { [option: string]: number } = {};
      votes.forEach((item) => {
        counts[item.option] = (counts[item.option] || 0) + 1;
      });
      setOptionCounts(counts);
    }
  }, [votes]);
  useEffect(() => {
    if (optionCounts) {
      const newProcessedData = Object.entries(optionCounts).map(([label, value]) => ({
        label,
        value,
        color: randomColor(), // Generate a random color
      }));
      setProcessedData(newProcessedData);
    }
  }, [optionCounts]);

  const vote = async () => {
    const newVote = {
      option: selected,
      poll_id: poll.id,
      user_id: user.id,
    } as { option: string; poll_id: any; user_id: string; id?: any };

    if (userVote) {
      newVote.id = userVote.id;
    }

    const { data, error } = await supabase
      .from("votes")
      .upsert([newVote])
      .select()
      .single();
    if (error) {
      console.log(error);
      Alert.alert("Failed to add the vote");
    } else {
      Alert.alert("Thank you for your vote");
    }
    fetchVotes()
  };
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
  const fetchUserData = async () => {
    if (!user) {
      return;
    }
    try {
      const { data, error } = await supabase
        .from("votes")
        .select("*")
        .eq("poll_id", Number.parseInt(id))
        .eq("user_id", user.id)
        .limit(1)
        .single();
      if (error && isAuthenticaed) {
        throw new Error("You haven't voted yet !");
      }

      if (data) {
        // setPoll(data);
        // console.log("data",data.option);
        setUserVote(data);
        setSelected(data.option);
      }
    } catch (error) {
      if (isAuthenticaed) Alert.alert("You haven't voted yet !");
    }
  };
  const fetchVotes = async () => {
    try {
      const { data, error } = await supabase
        .from("votes")
        .select("*")
        .eq("poll_id", Number.parseInt(id));
      if (error) {
        throw new Error("Till no one has voted");
      }

      if (data) {
        // setPoll(data);
        // console.log("data",data);
        setVotes(data);
        // setSelected(data.option);
      }
    } catch (error) {
      Alert.alert("Till no one has voted");
    }
  };
  useEffect(() => {
   

   
    fetchPolls();
    fetchUserData();
    fetchVotes();
  }, []);
  if (!poll) {
    return <ActivityIndicator />;
  }
  return (
    <ScrollView>
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

        <View style={{ marginTop: 10 }}>
          {
            userVote?.option ? <BarChart
            showFractionalValues={true} // Updated property name
            showYAxisIndices={true}
            noOfSections={4}
            data={processedData}
            isAnimated={true}
          />
          :
          <Text style={{color:"red"}}>Vote and see the results till now </Text>
          }
          
        </View>
      </View>
    </ScrollView>
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
