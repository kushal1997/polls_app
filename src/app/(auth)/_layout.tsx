import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'
import { useAuth } from '../providers/AuthProvider';

const AuthLayout = () => {
    const { session, user } = useAuth();
    if(user){
      return <Redirect href={"/profile"}/>
    }
  return (
    <Slot/>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})