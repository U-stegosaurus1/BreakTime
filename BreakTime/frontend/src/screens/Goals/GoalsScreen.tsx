import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function GoalsScreen() {
  const navigation = useNavigation();

  const [goals, setGoals] = useState([
    { id: '1', title: 'Walk 5,000 steps daily', target: 5000, current: 3200, unit: 'steps', icon: 'shoe-sneaker', bg: '#EBF4FF', color: '#3B82F6' },
    { id: '2', title: 'Drink 2L of water', target: 2000, current: 1500, unit: 'ml', icon: 'water', bg: '#E6F8F3', color: '#00D084' },
    { id: '3', title: 'Active Breaks', target: 3, current: 3, unit: 'breaks', icon: 'yoga', bg: '#F3E8FF', color: '#8B5CF6' },
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7FA" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Icon name="chevron-left" size={28} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Goals</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="plus" size={28} color="#635BFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Weekly Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.summaryTitle}>Weekly Completion</Text>
              <Text style={styles.summaryPct}>78%</Text>
            </View>
            <View style={styles.summaryIconWrap}>
              <Icon name="flag-checkered" size={32} color="#635BFF" />
            </View>
          </View>
          <View style={styles.progBarBg}>
            <View style={[styles.progBarFill, { width: '78%' }]} />
          </View>
        </View>

        {/* Goals List */}
        <Text style={styles.sectionTitle}>Active Goals</Text>
        <View style={styles.list}>
          {goals.map(goal => {
            const pct = Math.min((goal.current / goal.target) * 100, 100);
            const isDone = pct === 100;
            return (
              <View key={goal.id} style={styles.goalCard}>
                <View style={styles.goalTop}>
                  <View style={[styles.goalIconWrap, { backgroundColor: isDone ? '#E6F8F3' : goal.bg }]}>
                    <Icon name={goal.icon} size={24} color={isDone ? '#00D084' : goal.color} />
                  </View>
                  <View style={styles.goalInfo}>
                    <Text style={styles.goalTitle}>{goal.title}</Text>
                    <Text style={styles.goalSub}>{goal.current} / {goal.target} {goal.unit}</Text>
                  </View>
                  {isDone && <Icon name="check-circle" size={24} color="#00D084" />}
                </View>
                <View style={styles.goalProgBg}>
                  <View style={[styles.goalProgFill, { width: `${pct}%` as any, backgroundColor: isDone ? '#00D084' : goal.color }]} />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7FA' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingTop: 16, 
    paddingBottom: 24 
  },
  iconBtn: { padding: 4 },
  headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 18, color: '#1A1A2E' },
  
  content: { paddingHorizontal: 24, paddingBottom: 40, gap: 24 },
  
  summaryCard: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  summaryTitle: { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#9890B8', marginBottom: 4 },
  summaryPct: { fontFamily: 'Poppins-Bold', fontSize: 32, color: '#1A1A2E', lineHeight: 40 },
  summaryIconWrap: { width: 56, height: 56, borderRadius: 16, backgroundColor: '#EAE6FF', alignItems: 'center', justifyContent: 'center' },
  progBarBg: { height: 8, borderRadius: 4, backgroundColor: '#F5F5F9', overflow: 'hidden' },
  progBarFill: { height: '100%', borderRadius: 4, backgroundColor: '#635BFF' },

  sectionTitle: { fontFamily: 'Poppins-Bold', fontSize: 16, color: '#1A1A2E', marginBottom: -8 },
  list: { gap: 16 },
  goalCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  goalTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  goalIconWrap: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  goalInfo: { flex: 1 },
  goalTitle: { fontFamily: 'Poppins-Bold', fontSize: 14, color: '#1A1A2E', marginBottom: 4 },
  goalSub: { fontFamily: 'Poppins-Medium', fontSize: 13, color: '#9890B8' },
  goalProgBg: { height: 6, borderRadius: 3, backgroundColor: '#F5F5F9', overflow: 'hidden' },
  goalProgFill: { height: '100%', borderRadius: 3 },
});
