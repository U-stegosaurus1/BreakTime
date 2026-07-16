import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { activityApi } from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function ActivityBreakScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { type } = route.params as { type: string };
  const queryClient = useQueryClient();

  const getDuration = () => {
    switch (type) {
      case 'stretch': return 5 * 60;
      case 'walk': return 2 * 60;
      case 'stairs': return 3 * 60;
      case 'water': return 1 * 60;
      default: return 5 * 60;
    }
  };

  const [timeLeft, setTimeLeft] = useState(getDuration());
  const [isActive, setIsActive] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const { mutate: logActivity, isPending: isLoading } = useMutation({
    mutationFn: (data: any) => activityApi.log(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      navigation.goBack();
    },
  });

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isFinished) {
      setIsActive(false);
      setIsFinished(true);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isFinished]);

  const handleFinish = () => {
    logActivity({
      activityType: type.toUpperCase(),
      durationMinutes: Math.ceil(getDuration() / 60),
      notes: 'Completed session',
    });
  };

  const mins = Math.floor(timeLeft / 60);
  const totalMins = getDuration() / 60;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Icon name="chevron-left" size={28} color="#1A1A2E" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="dots-horizontal" size={28} color="#1A1A2E" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        
        {/* Title & Progress Circle */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>Stretch Break</Text>
          <View style={styles.progressCircle}>
            <Text style={styles.progressText}>{totalMins - mins}/{totalMins}</Text>
          </View>
        </View>

        {/* Hero Illustration */}
        <View style={styles.illustrationWrap}>
          <View style={styles.mockIllustration}>
            <Icon name="yoga" size={160} color="#635BFF" />
          </View>
        </View>

        {/* Completion Message or Timer */}
        {isFinished ? (
          <View style={styles.messageWrap}>
            <Text style={styles.messageTitle}>Great Job!</Text>
            <Text style={styles.messageSub}>You completed this break.</Text>
            <Text style={styles.pointsText}>+ 25 Points</Text>
          </View>
        ) : (
          <View style={styles.messageWrap}>
            <Text style={styles.messageTitle}>Keep Going!</Text>
            <Text style={styles.messageSub}>{mins} minutes remaining.</Text>
          </View>
        )}

        {/* Footer Button */}
        <TouchableOpacity 
          style={styles.finishBtn} 
          onPress={isFinished ? handleFinish : () => setIsFinished(true)}
          disabled={isLoading}
        >
          <Text style={styles.finishBtnText}>{isLoading ? 'Saving...' : 'Finish'}</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingTop: 16 
  },
  iconBtn: { padding: 4 },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1A1A2E',
  },
  progressCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#635BFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  progressText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    color: '#635BFF',
  },
  illustrationWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mockIllustration: {
    width: width * 0.7,
    height: width * 0.8,
    backgroundColor: '#F5F5F9',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageWrap: {
    alignItems: 'center',
    marginBottom: 32,
  },
  messageTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1A1A2E',
    marginBottom: 8,
  },
  messageSub: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#9890B8',
    marginBottom: 12,
  },
  pointsText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#F59E0B',
  },
  finishBtn: {
    backgroundColor: '#635BFF',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  finishBtnText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
