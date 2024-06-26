import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'
import { useAuth } from '../providers/AuthProvider';

const ProtectedLayout = () => {
    const { session, user,isAuthenticaed } = useAuth();
    if(!isAuthenticaed){
      return <Redirect href={"/login"}/>
    }
  return (
  <Slot/>
  )
}

export default ProtectedLayout

const styles = StyleSheet.create({})