import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
  StatusBar, Modal, TextInput, Alert, Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type Goal = {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  icon: string;
  bg: string;
  color: string;
  type: 'daily' | 'weekly';
};

const INITIAL_GOALS: Goal[] = [
  { id: '1', title: 'Walk daily steps',      target: 5000, current: 3200, unit: 'steps',  icon: 'shoe-sneaker',  bg: '#EBF4FF', color: '#3B82F6', type: 'daily'  },
  { id: '2', title: 'Drink water daily',     target: 2000, current: 1500, unit: 'ml',     icon: 'water',         bg: '#E6F8F3', color: '#00C897', type: 'daily'  },
  { id: '3', title: 'Active breaks today',   target: 3,    current: 3,    unit: 'breaks', icon: 'yoga',          bg: '#F3E8FF', color: '#8B5CF6', type: 'daily'  },
  { id: '4', title: 'Weekly active minutes', target: 150,  current: 90,   unit: 'min',    icon: 'lightning-bolt', bg: '#FFF3E8', color: '#F59E0B', type: 'weekly' },
];

const ICON_OPTIONS = [
  { key: 'shoe-sneaker',  label: 'Steps'  },
  { key: 'water',         label: 'Water'  },
  { key: 'yoga',          label: 'Breaks' },
  { key: 'lightning-bolt', label: 'Active' },
  { key: 'run-fast',      label: 'Run'    },
  { key: 'bike',          label: 'Cycle'  },
];

export default function GoalsScreen() {
  const navigation = useNavigation<any>();

  const [goals, setGoals]               = useState<Goal[]>(INITIAL_GOALS);
  const [showModal, setShowModal]       = useState(false);
  const [newTitle, setNewTitle]         = useState('');
  const [newTarget, setNewTarget]       = useState('');
  const [newUnit, setNewUnit]           = useState('steps');
  const [newIcon, setNewIcon]           = useState('shoe-sneaker');
  const [newType, setNewType]           = useState<'daily' | 'weekly'>('daily');
  const [activeFilter, setActiveFilter] = useState<'all' | 'daily' | 'weekly'>('all');

  const weeklyCompletion = Math.round(
    goals.reduce((acc, g) => acc + Math.min((g.current / g.target) * 100, 100), 0) / goals.length
  );

  const filtered = activeFilter === 'all' ? goals : goals.filter(g => g.type === activeFilter);

  const handleAddGoal = () => {
    if (!newTitle.trim() || !newTarget.trim()) {
      Alert.alert('Oops', 'Please fill all fields.');
      return;
    }
    const goal: Goal = {
      id: Date.now().toString(),
      title: newTitle,
      target: parseInt(newTarget, 10),
      current: 0,
      unit: newUnit,
      icon: newIcon,
      bg: '#EAE6FF',
      color: '#6C3AE0',
      type: newType,
    };
    setGoals(prev => [goal, ...prev]);
    setNewTitle(''); setNewTarget(''); setNewUnit('steps'); setNewIcon('shoe-sneaker'); setNewType('daily');
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Goal', 'Remove this goal?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setGoals(prev => prev.filter(g => g.id !== id)) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Goals</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setShowModal(true)} activeOpacity={0.85}>
          <Ionicons name="add" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Weekly Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.summaryLabel}>Weekly Completion</Text>
              <Text style={styles.summaryPct}>{weeklyCompletion}%</Text>
            </View>
            <View style={styles.summaryIconWrap}>
              <Ionicons name="trophy" size={28} color="#FFFFFF" />
            </View>
          </View>
          <View style={styles.progBarBg}>
            <View style={[styles.progBarFill, { width: `${weeklyCompletion}%` as any }]} />
          </View>
          <Text style={styles.summaryHint}>{goals.filter(g => g.current >= g.target).length} of {goals.length} goals completed</Text>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          {(['all', 'daily', 'weekly'] as const).map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterPill, activeFilter === f && styles.filterPillActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Goals List */}
        <Text style={styles.sectionTitle}>Active Goals</Text>

        {filtered.map(goal => {
          const pct = Math.min((goal.current / goal.target) * 100, 100);
          const isDone = pct >= 100;
          return (
            <TouchableOpacity
              key={goal.id}
              activeOpacity={0.85}
              style={styles.goalCard}
              onLongPress={() => handleDelete(goal.id)}
            >
              <View style={styles.goalTop}>
                <View style={[styles.goalIconWrap, { backgroundColor: isDone ? '#E6F8F3' : goal.bg }]}>
                  <MaterialCommunityIcons name={goal.icon as any} size={22} color={isDone ? '#00C897' : goal.color} />
                </View>
                <View style={styles.goalInfo}>
                  <View style={styles.goalTitleRow}>
                    <Text style={styles.goalTitle}>{goal.title}</Text>
                    <View style={[styles.typeBadge, { backgroundColor: goal.type === 'daily' ? '#EAE6FF' : '#E6F8F3' }]}>
                      <Text style={[styles.typeBadgeText, { color: goal.type === 'daily' ? '#6C3AE0' : '#00C897' }]}>
                        {goal.type}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.goalSub}>
                    {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}
                  </Text>
                </View>
                {isDone && <Ionicons name="checkmark-circle" size={24} color="#00C897" />}
              </View>
              <View style={styles.progressWrap}>
                <View style={styles.goalProgBg}>
                  <View style={[styles.goalProgFill, { width: `${pct}%` as any, backgroundColor: isDone ? '#00C897' : goal.color }]} />
                </View>
                <Text style={[styles.pctText, { color: isDone ? '#00C897' : goal.color }]}>{Math.round(pct)}%</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <Text style={styles.hintText}>Long press a goal to delete it</Text>
      </ScrollView>

      {/* Add Goal Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>New Goal</Text>

            <Text style={styles.fieldLabel}>Goal Title</Text>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Walk 5,000 steps"
                placeholderTextColor="#C4BFD8"
                value={newTitle}
                onChangeText={setNewTitle}
              />
            </View>

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>Target</Text>
                <View style={styles.inputWrap}>
                  <TextInput style={styles.textInput} placeholder="5000" placeholderTextColor="#C4BFD8" value={newTarget} onChangeText={setNewTarget} keyboardType="numeric" />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>Unit</Text>
                <View style={styles.inputWrap}>
                  <TextInput style={styles.textInput} placeholder="steps" placeholderTextColor="#C4BFD8" value={newUnit} onChangeText={setNewUnit} />
                </View>
              </View>
            </View>

            <Text style={styles.fieldLabel}>Type</Text>
            <View style={styles.typeToggle}>
              {(['daily', 'weekly'] as const).map(t => (
                <TouchableOpacity
                  key={t}
                  style={[styles.typeBtn, newType === t && styles.typeBtnActive]}
                  onPress={() => setNewType(t)}
                >
                  <Text style={[styles.typeBtnText, newType === t && styles.typeBtnTextActive]}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fieldLabel}>Icon</Text>
            <View style={styles.iconRow}>
              {ICON_OPTIONS.map(opt => (
                <TouchableOpacity
                  key={opt.key}
                  style={[styles.iconOption, newIcon === opt.key && styles.iconOptionActive]}
                  onPress={() => setNewIcon(opt.key)}
                >
                  <MaterialCommunityIcons name={opt.key as any} size={22} color={newIcon === opt.key ? '#6C3AE0' : '#9890B8'} />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleAddGoal} activeOpacity={0.85}>
              <Text style={styles.saveBtnText}>Add Goal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  header:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#F0EFF5' },
  iconBtn:  { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F5F3FF', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 20, color: '#1A1A2E' },
  addBtn:   { width: 36, height: 36, borderRadius: 12, backgroundColor: '#6C3AE0', alignItems: 'center', justifyContent: 'center' },
  content:  { paddingHorizontal: 20, paddingBottom: 120, gap: 16, paddingTop: 16 },

  // Summary card
  summaryCard:    { padding: 24, borderRadius: 24, backgroundColor: '#6C3AE0' },
  summaryTop:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  summaryLabel:   { fontFamily: 'Poppins-Medium', fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  summaryPct:     { fontFamily: 'Poppins-Bold', fontSize: 36, color: '#fff' },
  summaryIconWrap:{ width: 56, height: 56, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  progBarBg:      { height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)', overflow: 'hidden', marginBottom: 12 },
  progBarFill:    { height: '100%', borderRadius: 4, backgroundColor: '#fff' },
  summaryHint:    { fontFamily: 'Poppins-Medium', fontSize: 12, color: 'rgba(255,255,255,0.7)' },

  // Filter
  filterRow:        { flexDirection: 'row', borderRadius: 16, padding: 4, backgroundColor: '#F5F3FF' },
  filterPill:       { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  filterPillActive: { backgroundColor: '#6C3AE0' },
  filterText:       { fontFamily: 'Poppins-Bold', fontSize: 13, color: '#9890B8' },
  filterTextActive: { color: '#FFFFFF' },

  sectionTitle: { fontFamily: 'Poppins-Bold', fontSize: 16, color: '#1A1A2E', marginBottom: -4 },

  // Goal card
  goalCard:     { borderRadius: 20, padding: 18, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F0EFF5', shadowColor: '#1A1A2E', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  goalTop:      { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  goalIconWrap: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  goalInfo:     { flex: 1 },
  goalTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  goalTitle:    { fontFamily: 'Poppins-Bold', fontSize: 14, color: '#1A1A2E', flex: 1 },
  typeBadge:    { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  typeBadgeText:{ fontFamily: 'Poppins-Bold', fontSize: 10 },
  goalSub:      { fontFamily: 'Poppins-Medium', fontSize: 13, color: '#9890B8' },
  progressWrap: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  goalProgBg:   { flex: 1, height: 8, borderRadius: 4, backgroundColor: '#F5F3FF', overflow: 'hidden' },
  goalProgFill: { height: '100%', borderRadius: 4 },
  pctText:      { fontFamily: 'Poppins-Bold', fontSize: 12, width: 34, textAlign: 'right' },
  hintText:     { fontFamily: 'Poppins-Medium', fontSize: 12, color: '#C0BDCC', textAlign: 'center' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalSheet:   { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 48, backgroundColor: '#FFFFFF' },
  modalTitle:   { fontFamily: 'Poppins-Bold', fontSize: 20, color: '#1A1A2E', marginBottom: 20 },
  fieldLabel:   { fontFamily: 'Poppins-Medium', fontSize: 12, color: '#9890B8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  inputWrap:    { borderWidth: 1.5, borderColor: '#E8E4F0', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 16, backgroundColor: '#FAFAFA' },
  textInput:    { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#1A1A2E' },
  row:          { flexDirection: 'row', gap: 12 },

  typeToggle:      { flexDirection: 'row', borderRadius: 12, padding: 4, marginBottom: 16, backgroundColor: '#F5F3FF' },
  typeBtn:         { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  typeBtnActive:   { backgroundColor: '#6C3AE0' },
  typeBtnText:     { fontFamily: 'Poppins-Bold', fontSize: 13, color: '#9890B8' },
  typeBtnTextActive:{ color: '#FFFFFF' },

  iconRow:         { flexDirection: 'row', gap: 10, marginBottom: 20, flexWrap: 'wrap' },
  iconOption:      { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#E8E4F0', backgroundColor: '#FAFAFA' },
  iconOptionActive:{ borderColor: '#6C3AE0', backgroundColor: '#F0EDFF' },

  saveBtn:     { backgroundColor: '#6C3AE0', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginBottom: 12, shadowColor: '#6C3AE0', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 5 },
  saveBtnText: { fontFamily: 'Poppins-Bold', fontSize: 16, color: '#fff' },
  cancelText:  { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#9890B8', textAlign: 'center' },
});
