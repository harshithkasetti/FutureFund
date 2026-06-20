// FutureFund — Dashboard Screen
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';
import AppHeader from '../../components/AppHeader';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const MOCK_GOALS = [
  { id: '1', title: 'Emergency Fund', emoji: '🛡️', saved: 45000, target: 100000, color: '#00F5FF', progress: 0.45 },
  { id: '2', title: 'Goa Trip 2025', emoji: '✈️', saved: 22500, target: 50000, color: '#BF5FFF', progress: 0.45 },
  { id: '3', title: 'MacBook Pro', emoji: '💻', saved: 68000, target: 90000, color: '#00FF9D', progress: 0.76 },
];

const QUICK_ACTIONS = [
  { id: 'add_money', label: 'Add Money', emoji: '➕', color: '#00F5FF' },
  { id: 'new_goal', label: 'New Goal', emoji: '🎯', color: '#BF5FFF' },
  { id: 'auto_save', label: 'AutoSave', emoji: '🔄', color: '#00FF9D' },
  { id: 'vault', label: 'Vault', emoji: '🔐', color: '#FFE600' },
  { id: 'wallet', label: 'My Wallet', emoji: '💳', color: '#FF8C42' },
];

const RECENT_TRANSACTIONS = [
  { id: '1', desc: 'Emergency Fund', amount: -2000, type: 'goal', time: '2h ago', icon: '🛡️' },
  { id: '2', desc: 'Salary Credit', amount: 75000, type: 'income', time: 'Yesterday', icon: '💳' },
  { id: '3', desc: 'Goa Trip Goal', amount: -5000, type: 'goal', time: 'Yesterday', icon: '✈️' },
  { id: '4', desc: 'AutoSave', amount: -1500, type: 'auto', time: '2 days ago', icon: '🔄' },
];

const CircularProgress = ({
  progress,
  color,
  size = 56,
  strokeWidth = 4,
}: {
  progress: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Track */}
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: `${color}25`,
        }}
      />
      {/* Progress arc — simulated with rotation */}
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: color,
          borderTopColor: progress > 0.25 ? color : 'transparent',
          borderRightColor: progress > 0.5 ? color : 'transparent',
          borderBottomColor: progress > 0.75 ? color : 'transparent',
          borderLeftColor: progress > 0 ? color : 'transparent',
          transform: [{ rotate: '-90deg' }],
        }}
      />
      <Text style={{ fontSize: 10, fontWeight: 'bold', color }}>
        {Math.round(progress * 100)}%
      </Text>
    </View>
  );
};

const DashboardScreen: React.FC = () => {
  const { colors, isDark, spacing, radius, fontFamilies, fontSizes } = useTheme();
  const navigation = useNavigation<any>();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({ inputRange: [0, 60], outputRange: [0, 1], extrapolate: 'clamp' });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const accentColor = isDark ? colors.neonCyan : '#C9A84C';
  const bg = isDark ? colors.background : colors.backgroundSecondary;

  const formatAmount = (n: number) =>
    balanceVisible
      ? `₹${n.toLocaleString('en-IN')}`
      : '₹ ••••••';

  return (
    <View style={[styles.container, { backgroundColor: bg as string }]}>
      {/* Sticky header on scroll */}
      <Animated.View
        style={[
          styles.stickyHeader,
          {
            backgroundColor: isDark ? colors.background : colors.surface,
            borderBottomColor: colors.border,
            opacity: headerOpacity,
          },
        ]}
      >
        <Text style={{ fontFamily: fontFamilies.heading as string, fontSize: fontSizes.md, color: colors.textPrimary }}>
          FUTURE<Text style={{ color: accentColor }}>FUND</Text>
        </Text>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={accentColor} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Top bar */}
        <View style={[styles.topBar, { paddingHorizontal: spacing[5], paddingTop: spacing[5] }]}>
          <View>
            <Text style={{ fontFamily: fontFamilies.body as string, fontSize: fontSizes.sm, color: colors.textTertiary, letterSpacing: 0.5 }}>
              Good morning 👋
            </Text>
            <Text style={{ fontFamily: fontFamilies.heading as string, fontSize: fontSizes.xl, color: colors.textPrimary, marginTop: 2 }}>
              Harshith Kasetti
            </Text>
          </View>
          <View style={styles.topBarRight}>
            <TouchableOpacity
              style={[
                styles.iconBtn,
                { backgroundColor: isDark ? colors.surface : colors.white, borderColor: colors.border },
              ]}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Text style={{ fontSize: 16 }}>🔔</Text>
              {/* Unread badge */}
              <View style={[styles.badge, { backgroundColor: isDark ? colors.neonPink : colors.error }]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.avatar, { backgroundColor: isDark ? colors.surface : '#E8E0D0' }]}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={{ fontFamily: fontFamilies.heading as string, fontSize: fontSizes.md, color: accentColor }}>HK</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance Hero Card */}
        <View style={[styles.heroCardWrap, { paddingHorizontal: spacing[5], marginTop: spacing[5] }]}>
          <View
            style={[
              styles.heroCard,
              {
                backgroundColor: isDark ? colors.surface : '#1A1209',
                borderRadius: radius['3xl'],
                borderWidth: 1,
                borderColor: isDark ? colors.border : 'transparent',
              },
            ]}
          >
            {/* Glow effect top right */}
            <View
              style={[
                styles.heroGlow,
                { backgroundColor: isDark ? colors.neonCyan : '#C9A84C', opacity: isDark ? 0.12 : 0.2 },
              ]}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View>
                <Text
                  style={{
                    fontFamily: fontFamilies.body as string,
                    fontSize: fontSizes.xs,
                    color: isDark ? colors.textTertiary : 'rgba(255,255,255,0.5)',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}
                >
                  Total Savings
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamilies.mono as string,
                    fontSize: balanceVisible ? fontSizes['4xl'] : fontSizes['2xl'],
                    color: isDark ? colors.neonCyan : '#E8C97A',
                    letterSpacing: -1,
                    lineHeight: balanceVisible ? fontSizes['4xl'] * 1.15 : fontSizes['2xl'] * 1.15,
                  }}
                >
                  {formatAmount(245500)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setBalanceVisible(!balanceVisible)}
                style={[
                  styles.visibilityBtn,
                  { backgroundColor: isDark ? 'rgba(0,245,255,0.1)' : 'rgba(201,168,76,0.15)' },
                ]}
              >
                <Text style={{ fontSize: 14 }}>{balanceVisible ? '👁️' : '🙈'}</Text>
              </TouchableOpacity>
            </View>

            {/* Change indicator */}
            <View style={[styles.changeRow, { marginTop: spacing[3] }]}>
              <View
                style={[
                  styles.changePill,
                  { backgroundColor: isDark ? 'rgba(0,255,157,0.15)' : 'rgba(16,217,143,0.15)' },
                ]}
              >
                <Text
                  style={{
                    fontFamily: fontFamilies.bodyMedium as string,
                    fontSize: fontSizes.sm,
                    color: isDark ? colors.neonGreen : colors.success,
                  }}
                >
                  ↑ 8.4% this month
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: fontFamilies.body as string,
                  fontSize: fontSizes.xs,
                  color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.4)',
                  marginLeft: spacing[3],
                }}
              >
                +₹18,900
              </Text>
            </View>

            {/* Divider */}
            <View style={[styles.heroDivider, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.12)', marginVertical: spacing[5] }]} />

            {/* Stat row */}
            <View style={styles.statRow}>
              {[
                { label: 'Wallet', value: '₹32,500', color: isDark ? '#4D9EFF' : '#7BA8D9' },
                { label: 'Goals', value: '₹1,35,500', color: isDark ? colors.neonCyan : '#E8C97A' },
                { label: 'Vault', value: '₹78,500', color: isDark ? colors.neonGreen : '#6DC99A' },
              ].map((stat) => (
                <View key={stat.label} style={{ alignItems: 'center' }}>
                  <Text
                    style={{
                      fontFamily: fontFamilies.mono as string,
                      fontSize: fontSizes.base,
                      color: stat.color,
                      letterSpacing: -0.5,
                    }}
                  >
                    {balanceVisible ? stat.value : '••••'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamilies.body as string,
                      fontSize: fontSizes.xs,
                      color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.5)',
                      marginTop: 4,
                      letterSpacing: 0.5,
                    }}
                  >
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: spacing[5], marginTop: spacing[7] }}>
          <Text
            style={{
              fontFamily: fontFamilies.heading as string,
              fontSize: fontSizes.base,
              color: colors.textSecondary,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: spacing[4],
            }}
          >
            Quick Actions
          </Text>
          <View style={styles.actionsGrid}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[
                  styles.actionBtn,
                  {
                    backgroundColor: isDark ? colors.surface : colors.white,
                    borderRadius: radius.xl,
                    borderWidth: 1,
                    borderColor: isDark ? colors.border : colors.borderLight,
                    shadowColor: isDark ? action.color : '#241E16',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: isDark ? 0.15 : 0.06,
                    shadowRadius: 12,
                    elevation: 3,
                  },
                ]}
                onPress={() => {
  if (action.id === 'add_money') {
    navigation.navigate('Wallet');
  } else if (action.id === 'wallet') {
    navigation.navigate('Wallet');
  } else if (action.id === 'new_goal') {
    navigation.navigate('Goals');
  } else if (action.id === 'vault') {
    navigation.navigate('Vault');
  } else if (action.id === 'auto_save') {
    navigation.navigate('AutoSave');
  }
}}
              >
                <View
                  style={[
                    styles.actionEmoji,
                    { backgroundColor: isDark ? `${action.color}15` : `${action.color}12` },
                  ]}
                >
                  <Text style={{ fontSize: 22 }}>{action.emoji}</Text>
                </View>
                <Text
                  style={{
                    fontFamily: fontFamilies.bodyMedium as string,
                    fontSize: fontSizes.sm,
                    color: colors.textPrimary,
                    marginTop: spacing[2],
                    textAlign: 'center',
                  }}
                >
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Active Goals */}
        <View style={{ marginTop: spacing[8] }}>
          <View style={[styles.sectionHeader, { paddingHorizontal: spacing[5] }]}>
            <Text style={{ fontFamily: fontFamilies.heading as string, fontSize: fontSizes.base, color: colors.textSecondary, letterSpacing: 2, textTransform: 'uppercase' }}>
              Active Goals
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Goals')}>
              <Text style={{ fontFamily: fontFamilies.bodyMedium as string, fontSize: fontSizes.sm, color: accentColor }}>
                See all →
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacing[5], gap: 12, marginTop: spacing[4] }}
          >
            {MOCK_GOALS.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalCard,
                  {
                    backgroundColor: isDark ? colors.surface : colors.white,
                    borderRadius: radius['2xl'],
                    borderWidth: 1,
                    borderColor: isDark ? colors.border : colors.borderLight,
                    shadowColor: isDark ? goal.color : '#241E16',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: isDark ? 0.15 : 0.07,
                    shadowRadius: 16,
                    elevation: 4,
                  },
                ]}
              >
                {/* Color accent strip */}
                <View style={[styles.goalStrip, { backgroundColor: goal.color, opacity: isDark ? 0.5 : 0.3 }]} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing[4] }}>
                  <View>
                    <Text style={{ fontSize: 28, marginBottom: 6 }}>{goal.emoji}</Text>
                    <Text style={{ fontFamily: fontFamilies.heading as string, fontSize: fontSizes.base, color: colors.textPrimary }}>
                      {goal.title}
                    </Text>
                  </View>
                  <CircularProgress progress={goal.progress} color={goal.color} />
                </View>

                {/* Progress bar */}
                <View style={[styles.progressTrack, { backgroundColor: isDark ? colors.darkBorder : colors.border }]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${goal.progress * 100}%`,
                        backgroundColor: goal.color,
                        shadowColor: goal.color,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: isDark ? 0.8 : 0.3,
                        shadowRadius: 8,
                        elevation: 4,
                      },
                    ]}
                  />
                </View>

                <View style={[styles.goalAmounts, { marginTop: spacing[3] }]}>
                  <Text style={{ fontFamily: fontFamilies.mono as string, fontSize: fontSizes.sm, color: goal.color }}>
                    ₹{goal.saved.toLocaleString('en-IN')}
                  </Text>
                  <Text style={{ fontFamily: fontFamilies.body as string, fontSize: fontSizes.xs, color: colors.textTertiary }}>
                    of ₹{goal.target.toLocaleString('en-IN')}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            {/* Add new goal card */}
            <TouchableOpacity
              style={[
                styles.goalCard,
                styles.addGoalCard,
                {
                  backgroundColor: 'transparent',
                  borderRadius: radius['2xl'],
                  borderWidth: 1.5,
                  borderColor: isDark ? `${colors.neonCyan}30` : `${colors.primary}30`,
                  borderStyle: 'dashed',
                },
              ]}
              onPress={() => navigation.navigate('Goals')}
            >
              <Text style={{ fontSize: 32, marginBottom: 8 }}>+</Text>
              <Text style={{ fontFamily: fontFamilies.bodyMedium as string, fontSize: fontSizes.sm, color: accentColor, textAlign: 'center' }}>
                New Goal
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Recent Transactions */}
        <View style={{ paddingHorizontal: spacing[5], marginTop: spacing[8] }}>
          <View style={[styles.sectionHeader, { marginBottom: spacing[4] }]}>
            <Text style={{ fontFamily: fontFamilies.heading as string, fontSize: fontSizes.base, color: colors.textSecondary, letterSpacing: 2, textTransform: 'uppercase' }}>
              Recent Activity
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
              <Text style={{ fontFamily: fontFamilies.bodyMedium as string, fontSize: fontSizes.sm, color: accentColor }}>
                View more →
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.txCard,
              {
                backgroundColor: isDark ? colors.surface : colors.white,
                borderRadius: radius['2xl'],
                borderWidth: 1,
                borderColor: isDark ? colors.border : colors.borderLight,
              },
            ]}
          >
            {RECENT_TRANSACTIONS.map((tx, i) => (
              <View key={tx.id}>
                <View style={styles.txRow}>
                  <View style={[styles.txIcon, { backgroundColor: isDark ? colors.darkSurface : colors.warmGray100 }]}>
                    <Text style={{ fontSize: 18 }}>{tx.icon}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: spacing[3] }}>
                    <Text style={{ fontFamily: fontFamilies.bodyMedium as string, fontSize: fontSizes.base, color: colors.textPrimary }}>
                      {tx.desc}
                    </Text>
                    <Text style={{ fontFamily: fontFamilies.body as string, fontSize: fontSizes.xs, color: colors.textTertiary, marginTop: 2 }}>
                      {tx.time}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: fontFamilies.mono as string,
                      fontSize: fontSizes.base,
                      color: tx.amount > 0
                        ? isDark ? colors.neonGreen : colors.success
                        : colors.textPrimary,
                      letterSpacing: -0.3,
                    }}
                  >
                    {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                  </Text>
                </View>
                {i < RECENT_TRANSACTIONS.length - 1 && (
                  <View style={[styles.txDivider, { backgroundColor: isDark ? colors.darkBorder : colors.borderLight }]} />
                )}
              </View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  visibilityBtn: {
  padding: 8,
  justifyContent: 'center',
  alignItems: 'center',
},
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    zIndex: 100,
  },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  topBarRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
  },
  badge: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4 },
  avatar: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  heroCardWrap: {},
  heroCard: { padding: 24, position: 'relative', overflow: 'hidden' },
  heroGlow: { position: 'absolute', width: 200, height: 200, borderRadius: 100, top: -60, right: -60 },
  changeRow: { flexDirection: 'row', alignItems: 'center' },
  changePill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  heroDivider: { height: 1 },
  statRow: { flexDirection: 'row', justifyContent: 'space-around' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  actionBtn: { width: '30%', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 8 },
  actionEmoji: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  goalCard: { width: 180, padding: 16, position: 'relative', overflow: 'hidden' },
  goalStrip: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  addGoalCard: { alignItems: 'center', justifyContent: 'center' },
  progressTrack: { height: 4, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
  goalAmounts: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  txCard: { overflow: 'hidden' },
  txRow: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  txIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  txDivider: { height: 1, marginLeft: 72 },
});

export default DashboardScreen;