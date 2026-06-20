import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const AnalyticsScreen = () => {
  const healthScore = 89;
  const completionProbability = 92;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Analytics</Text>
      <Text style={styles.subHeader}>
        Track your financial growth and savings performance
      </Text>

      {/* Health Score */}
      <View style={styles.healthCard}>
        <Text style={styles.cardTitle}>Saving Health Score</Text>

        <View style={styles.scoreCircle}>
          <Text style={styles.scoreText}>{healthScore}</Text>
          <Text style={styles.scorePercent}>%</Text>
        </View>

        <Text style={styles.goodText}>
          Excellent Financial Discipline
        </Text>
      </View>

      {/* Forecast Cards */}
      <View style={styles.row}>
        <View style={styles.smallCard}>
          <Text style={styles.smallLabel}>
            Goal Completion
          </Text>

          <Text style={styles.bigValue}>
            {completionProbability}%
          </Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.smallLabel}>
            Monthly Growth
          </Text>

          <Text style={styles.bigValue}>
            +14%
          </Text>
        </View>
      </View>

      {/* Forecast */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Goal Forecast
        </Text>

        <Text style={styles.forecastText}>
          Based on your current savings rate,
          your Bike Goal is expected to be
          completed by
        </Text>

        <Text style={styles.forecastDate}>
          December 2026
        </Text>
      </View>

      {/* AI Recommendation */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          AI Recommendation
        </Text>

        <Text style={styles.recommendation}>
          Increase monthly savings by ₹2,000
          to reach your target 4 months earlier.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Apply Recommendation
          </Text>
        </TouchableOpacity>
      </View>

      {/* Insights */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Insights
        </Text>

        <View style={styles.insightItem}>
          <Text style={styles.insightBullet}>•</Text>
          <Text style={styles.insightText}>
            You saved 18% more this month than last month.
          </Text>
        </View>

        <View style={styles.insightItem}>
          <Text style={styles.insightBullet}>•</Text>
          <Text style={styles.insightText}>
            Auto Save contributed ₹6,500 this month.
          </Text>
        </View>

        <View style={styles.insightItem}>
          <Text style={styles.insightBullet}>•</Text>
          <Text style={styles.insightText}>
            You're ahead of schedule by 12 days.
          </Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },

  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F172A',
  },

  subHeader: {
    color: '#64748B',
    marginTop: 6,
    marginBottom: 25,
    lineHeight: 22,
  },

  healthCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },

  scoreCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 10,
    borderColor: '#0F766E',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },

  scoreText: {
    fontSize: 42,
    fontWeight: '700',
    color: '#0F766E',
  },

  scorePercent: {
    fontSize: 18,
    color: '#0F766E',
  },

  goodText: {
    color: '#0F766E',
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  smallCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 20,
    borderRadius: 20,
  },

  smallLabel: {
    color: '#64748B',
    marginBottom: 12,
  },

  bigValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F766E',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },

  forecastText: {
    color: '#64748B',
    lineHeight: 22,
  },

  forecastDate: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F766E',
    marginTop: 15,
  },

  recommendation: {
    color: '#475569',
    lineHeight: 24,
  },

  button: {
    backgroundColor: '#0F766E',
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 18,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  insightItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  insightBullet: {
    marginRight: 10,
    color: '#0F766E',
    fontSize: 18,
  },

  insightText: {
    flex: 1,
    color: '#475569',
    lineHeight: 22,
  },
});