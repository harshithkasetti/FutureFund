// FutureFund — Goal List Screen
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../theme';
import AppHeader from '../../components/AppHeader';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const GOAL_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Done' },
  { id: 'paused', label: 'Paused' },
];

const GOALS = [
  {
    id: '1', title: 'Emergency Fund', emoji: '🛡️', category: 'emergency',
    saved: 45000, target: 100000, deadline: 'Dec 2025', status: 'active',
    color: '#00F5FF', lightColor: '#E0FEFF', autoSave: true, autoAmount: 2000,
  },
  {
    id: '2', title: 'Goa Trip 2025', emoji: '✈️', category: 'travel',
    saved: 22500, target: 50000, deadline: 'Oct 2025', status: 'active',
    color: '#BF5FFF', lightColor: '#F5E8FF', autoSave: true, autoAmount: 3000,
  },
  {
    id: '3', title: 'MacBook Pro M4', emoji: '💻', category: 'gadget',
    saved: 68400, target: 90000, deadline: 'Aug 2025', status: 'active',
    color: '#00FF9D', lightColor: '#E0FFF6', autoSave: false, autoAmount: 0,
  },
  {
    id: '4', title: 'New Apartment', emoji: '🏠', category: 'home',
    saved: 150000, target: 500000, deadline: 'Mar 2027', status: 'active',
    color: '#FFE600', lightColor: '#FFFCE0', autoSave: true, autoAmount: 10000,
  },
  {
    id: '5', title: 'Tokyo Vacation', emoji: '🗾', category: 'travel',
    saved: 80000, target: 80000, deadline: 'Jun 2025', status: 'completed',
    color: '#FF4D9E', lightColor: '#FFE8F4', autoSave: false, autoAmount: 0,
  },
];

const GoalCard: React.FC<{ goal: typeof GOALS[0]; isDark: boolean; colors: any; fontFamilies: any; fontSizes: any; spacing: any; radius: any }> = ({
  goal, isDark, colors, fontFamilies, fontSizes, spacing, radius,
}) => {
  const navigation = useNavigation<any>();
  const progress = Math.min(goal.saved / goal.target, 1);
  const remaining = Math.max(goal.target - goal.saved, 0);
  const isCompleted = goal.status === 'completed';

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('GoalDetails', {
          goal,
        })
      }
      style={[
        styles.goalCard,
        {
          backgroundColor: isDark ? colors.surface : colors.white,
          borderRadius: radius['2xl'],
          borderWidth: 1,
          borderColor: isDark ? colors.border : colors.borderLight,
          marginBottom: spacing[4],
          shadowColor: isDark ? goal.color : '#241E16',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isDark ? 0.12 : 0.06,
          shadowRadius: 16,
          elevation: 3,
          overflow: 'hidden',
        },
      ]}
    >
      {/* Color accent top bar */}
      <View style={[styles.topBar, { backgroundColor: goal.color, opacity: isDark ? 0.6 : 0.35 }]} />

      <View style={{ padding: spacing[5] }}>
        <View style={styles.cardHeader}>
          <View style={styles.emojiWrap}>
            <View
              style={[
                styles.emojiBox,
                { backgroundColor: isDark ? `${goal.color}20` : `${goal.color}20`, borderRadius: radius.lg },
              ]}
            >
              <Text style={{ fontSize: 26 }}>{goal.emoji}</Text>
            </View>
            <View style={{ marginLeft: spacing[3] }}>
              <Text style={{ fontFamily: fontFamilies.heading as string, fontSize: fontSizes.md, color: colors.textPrimary }}>
                {goal.title}
              </Text>
              <Text style={{ fontFamily: fontFamilies.body as string, fontSize: fontSizes.xs, color: colors.textTertiary, marginTop: 2 }}>
                Target: {goal.deadline}
              </Text>
            </View>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            {isCompleted ? (
              <View
                style={[
                  styles.statusPill,
                  { backgroundColor: isDark ? 'rgba(0,255,157,0.15)' : '#E6FAF3' },
                ]}
              >
                <Text style={{ fontFamily: fontFamilies.bodyMedium as string, fontSize: fontSizes.xs, color: isDark ? colors.neonGreen : colors.success }}>
                  ✓ Done
                </Text>
              </View>
            ) : (
              <Text style={{ fontFamily: fontFamilies.mono as string, fontSize: fontSizes.lg, color: goal.color }}>
                {Math.round(progress * 100)}%
              </Text>
            )}
          </View>
        </View>

        {/* Progress bar */}
        <View style={[styles.progressTrack, { backgroundColor: isDark ? colors.darkBorder : colors.border, marginTop: spacing[4] }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.round(progress * 100)}%`,
                backgroundColor: goal.color,
                shadowColor: goal.color,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: isDark ? 0.9 : 0.4,
                shadowRadius: 8,
              },
            ]}
          />
        </View>

        {/* Amounts */}
        <View style={[styles.amountsRow, { marginTop: spacing[3] }]}>
          <View>
            <Text style={{ fontFamily: fontFamilies.mono as string, fontSize: fontSizes.md, color: goal.color }}>
              ₹{goal.saved.toLocaleString('en-IN')}
            </Text>
            <Text style={{ fontFamily: fontFamilies.body as string, fontSize: fontSizes.xs, color: colors.textTertiary, marginTop: 2 }}>
              Saved
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            {remaining > 0 && (
              <>
                <Text style={{ fontFamily: fontFamilies.mono as string, fontSize: fontSizes.sm, color: colors.textSecondary }}>
                  ₹{remaining.toLocaleString('en-IN')}
                </Text>
                <Text style={{ fontFamily: fontFamilies.body as string, fontSize: fontSizes.xs, color: colors.textTertiary, marginTop: 2 }}>
                  Remaining
                </Text>
              </>
            )}
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontFamily: fontFamilies.mono as string, fontSize: fontSizes.md, color: colors.textSecondary }}>
              ₹{goal.target.toLocaleString('en-IN')}
            </Text>
            <Text style={{ fontFamily: fontFamilies.body as string, fontSize: fontSizes.xs, color: colors.textTertiary, marginTop: 2 }}>
              Target
            </Text>
          </View>
        </View>

        {/* AutoSave badge */}
        {goal.autoSave && !isCompleted && (
          <View style={[styles.autoSaveBadge, { backgroundColor: isDark ? 'rgba(0,245,255,0.08)' : 'rgba(160,120,48,0.08)', marginTop: spacing[4] }]}>
            <Text style={{ fontSize: 12 }}>🔄</Text>
            <Text style={{ fontFamily: fontFamilies.body as string, fontSize: fontSizes.xs, color: isDark ? colors.neonCyan : colors.primary, marginLeft: 6 }}>
              Auto-saving ₹{goal.autoAmount.toLocaleString('en-IN')} / month
            </Text>
          </View>
        )}

        {/* Goal Actions */}
{!isCompleted && (
  <View
    style={{
      flexDirection: 'row',
      marginTop: spacing[4],
      gap: 10,
    }}
  >
    <TouchableOpacity
      style={[
        styles.goalActionBtn,
        {
          backgroundColor: isDark
            ? `${goal.color}12`
            : `${goal.color}10`,
          borderColor: `${goal.color}30`,
        },
      ]}
    >
      <Text
        style={{
          color: goal.color,
          fontWeight: '700',
        }}
      >
        + Add Funds
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.goalActionBtn,
        {
          backgroundColor: '#F8F6F1',
          borderColor: '#E5E7EB',
        },
      ]}
      onPress={() =>
        navigation.navigate('EditGoal')
      }
    >
      <Text
        style={{
          color: '#A07830',
          fontWeight: '700',
        }}
      >
        ✏ Edit
      </Text>
    </TouchableOpacity>
  </View>
)}

      </View>
    </TouchableOpacity>
  );
};

const GoalListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, isDark, spacing, radius, fontFamilies, fontSizes } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');

  const accentColor = isDark ? colors.neonCyan : colors.primary;

  const filtered = activeFilter === 'all'
    ? GOALS
    : GOALS.filter((g) => g.status === activeFilter);

  const totalSaved = GOALS.filter(g => g.status === 'active').reduce((sum, g) => sum + g.saved, 0);
  const totalTarget = GOALS.filter(g => g.status === 'active').reduce((sum, g) => sum + g.target, 0);
  const overallProgress = totalSaved / totalTarget;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.background : colors.backgroundSecondary }]}>
      <AppHeader title="My Goals" variant="large" subtitle={`${GOALS.filter(g => g.status === 'active').length} active goals`} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Summary Card */}
        <View style={{ paddingHorizontal: spacing[5], marginBottom: spacing[6] }}>
          <View
            style={[
              styles.summaryCard,
              {
                backgroundColor: isDark ? colors.surface : colors.white,
                borderRadius: radius['2xl'],
                borderWidth: 1,
                borderColor: isDark ? colors.border : colors.borderLight,
              },
            ]}
          >
            <View style={styles.summaryRow}>
              <View>
                <Text style={{ fontFamily: fontFamilies.body as string, fontSize: fontSizes.xs, color: colors.textTertiary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                  Total Saved
                </Text>
                <Text style={{ fontFamily: fontFamilies.mono as string, fontSize: fontSizes['2xl'], color: accentColor as string, letterSpacing: -0.5 }}>
                  ₹{totalSaved.toLocaleString('en-IN')}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontFamily: fontFamilies.body as string, fontSize: fontSizes.xs, color: colors.textTertiary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                  Overall
                </Text>
                <Text style={{ fontFamily: fontFamilies.mono as string, fontSize: fontSizes['2xl'], color: isDark ? colors.neonGreen : colors.success }}>
                  {Math.round(overallProgress * 100)}%
                </Text>
              </View>
            </View>

            <View style={[styles.summaryProgress, { backgroundColor: isDark ? colors.darkBorder : colors.border, marginTop: spacing[4] }]}>
              <View
                style={[
                  styles.summaryFill,
                  {
                    width: `${Math.round(overallProgress * 100)}%`,
                    backgroundColor: accentColor as string,
                    shadowColor: accentColor as string,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: isDark ? 0.7 : 0.3,
                    shadowRadius: 6,
                  },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: spacing[5], gap: 8, marginBottom: spacing[5] }}
        >
          {GOAL_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setActiveFilter(cat.id)}
              style={[
                styles.filterPill,
                {
                  backgroundColor:
                    activeFilter === cat.id
                      ? accentColor as string
                      : isDark
                      ? colors.surface
                      : colors.white,
                  borderColor:
                    activeFilter === cat.id
                      ? accentColor as string
                      : isDark
                      ? colors.border
                      : colors.borderLight,
                  shadowColor: activeFilter === cat.id ? accentColor as string : 'transparent',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: activeFilter === cat.id ? 0.4 : 0,
                  shadowRadius: 8,
                  elevation: activeFilter === cat.id ? 4 : 0,
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: fontFamilies.bodyMedium as string,
                  fontSize: fontSizes.sm,
                  color: activeFilter === cat.id ? (isDark ? '#080B14' : '#fff') : colors.textSecondary,
                }}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Goal list */}
        <View style={{ paddingHorizontal: spacing[5] }}>
          {filtered.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              isDark={isDark}
              colors={colors}
              fontFamilies={fontFamilies}
              fontSizes={fontSizes}
              spacing={spacing}
              radius={radius}
            />
          ))}
        </View>

        {/* Create new goal */}
        <View style={{ paddingHorizontal: spacing[5], marginTop: spacing[4] }}>
          <CustomButton
            title="+ Create New Goal"
            onPress={() => navigation.navigate('CreateGoal')}
            variant={isDark ? 'secondary' : 'secondary'}
            fullWidth
            size="lg"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  emojiWrap: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  emojiBox: { width: 50, height: 50, alignItems: 'center', justifyContent: 'center' },
  statusPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  progressTrack: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  amountsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  autoSaveBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  addFundsBtn: { alignItems: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1 },
  summaryCard: { padding: 20 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryProgress: { height: 6, borderRadius: 3, overflow: 'hidden' },
  summaryFill: { height: '100%', borderRadius: 3 },
  filterPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  goalActionBtn: { flex: 1, height: 46, borderRadius: 12, borderWidth: 1, justifyContent: 'center', alignItems: 'center',},
  goalCard: {},
});

export default GoalListScreen;