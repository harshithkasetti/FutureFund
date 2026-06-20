import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../theme';

const { width } = Dimensions.get('window');

export default function GoalDetailsScreen() {
  const { colors, isDark } = useTheme();

  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(progressAnim, {
        toValue: 72,
        duration: 1800,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? colors.background
            : '#F8F6F1',
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View
  style={[
    styles.hero,
    {
      backgroundColor: isDark
        ? '#121826'
        : '#A07830',
      shadowColor: isDark ? '#00E5FF' : '#A07830',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 10,
    },
  ]}
>
  <Text style={styles.goalTitle}>
    Dream Bike Fund
  </Text>

  <Text style={styles.goalSubtitle}>
    Royal Enfield Hunter 350
  </Text>

  <Text style={styles.savedAmount}>
    ₹72,000
  </Text>

  <Text style={styles.targetAmount}>
    of ₹1,00,000 Goal
  </Text>
</View>

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark
                ? colors.surface
                : '#FFFFFF',
            },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              {
                color: isDark
                  ? colors.textPrimary
                  : '#111827',
              },
            ]}
          >
            Goal Progress
          </Text>

          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressWidth,
                  backgroundColor: isDark
                    ? '#00E5FF'
                    : '#C9A84C',
                },
              ]}
            />
          </View>

          <Text
            style={[
              styles.progressText,
              {
                color: isDark
                  ? '#00E5FF'
                  : '#A07830',
              },
            ]}
          >
            72% Completed
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: isDark
                  ? colors.surface
                  : '#FFFFFF',
              },
            ]}
          >
            <Text style={styles.statValue}>
              ₹28K
            </Text>
            <Text style={styles.statLabel}>
              Remaining
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: isDark
                  ? colors.surface
                  : '#FFFFFF',
              },
            ]}
          >
            <Text style={styles.statValue}>
              45 Days
            </Text>
            <Text style={styles.statLabel}>
              Left
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark
                ? colors.surface
                : '#FFFFFF',
            },
          ]}
        >
          <Text style={styles.sectionTitle}>
            AI Prediction
          </Text>

          <Text style={styles.aiText}>
            At your current savings pace,
            you'll reach this goal 43 days
            earlier than expected 🎉
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark
                ? colors.surface
                : '#FFFFFF',
            },
          ]}
        >
          <Text style={styles.sectionTitle}>
            Milestones
          </Text>

          <Text style={styles.milestone}>
            ✅ ₹25,000 Reached
          </Text>

          <Text style={styles.milestone}>
            ✅ ₹50,000 Reached
          </Text>

          <Text style={styles.milestone}>
            🔄 ₹75,000 Next
          </Text>

          <Text style={styles.milestone}>
            🎯 ₹1,00,000 Target
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark
                ? colors.surface
                : '#FFFFFF',
            },
          ]}
        >
          <Text style={styles.sectionTitle}>
            Achievements
          </Text>

          <View style={styles.badges}>
            <Text style={styles.badge}>
              🏆 Saver
            </Text>

            <Text style={styles.badge}>
              🔥 30 Days
            </Text>

            <Text style={styles.badge}>
              🎯 Champion
            </Text>

            <Text style={styles.badge}>
              💎 Premium
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark
                ? colors.surface
                : '#FFFFFF',
            },
          ]}
        >
          <Text style={styles.sectionTitle}>
            Recent Deposits
          </Text>

          <Text style={styles.deposit}>
            + ₹5,000 Today
          </Text>

          <Text style={styles.deposit}>
            + ₹2,500 Yesterday
          </Text>

          <Text style={styles.deposit}>
            + ₹10,000 Last Week
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark
                ? colors.surface
                : '#FFFFFF',
            },
          ]}
        >
          <Text style={styles.sectionTitle}>
            Vault Protection
          </Text>

          <Text style={styles.vault}>
            🛡 Iron Lock Active
          </Text>

          <Text style={styles.vaultSub}>
            Funds are locked until goal completion.
          </Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>
              + Add Money
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>
              📊 Analytics
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>
              ✏ Edit Goal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>
              🔄 Auto Save
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  hero: {
    paddingTop: 70,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  goalTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },

  goalSubtitle: {
    color: '#fff',
    opacity: 0.8,
    marginTop: 6,
  },

  savedAmount: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '700',
    marginTop: 25,
  },

  targetAmount: {
    color: '#fff',
    marginTop: 5,
  },

  card: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 24,
    elevation: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },

  progressTrack: {
    height: 14,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    overflow: 'hidden',
  },

  progressFill: {
    height: 14,
    borderRadius: 20,
  },

  progressText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },

  statCard: {
    width: '48%',
    borderRadius: 22,
    padding: 20,
    elevation: 4,
  },

  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#16A34A',
  },

  statLabel: {
    color: '#6B7280',
    marginTop: 5,
  },

  aiText: {
    color: '#16A34A',
    lineHeight: 24,
    fontWeight: '600',
  },

  milestone: {
    marginBottom: 12,
    fontSize: 15,
  },

  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  badge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
  },

  deposit: {
    color: '#16A34A',
    marginBottom: 12,
    fontWeight: '600',
  },

  vault: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2563EB',
  },

  vaultSub: {
    marginTop: 8,
    color: '#6B7280',
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15,
  },

  actionBtn: {
    width: '48%',
    backgroundColor: '#C9A84C',
    paddingVertical: 16,
    borderRadius: 18,
    elevation: 4,
  },

  actionText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
});