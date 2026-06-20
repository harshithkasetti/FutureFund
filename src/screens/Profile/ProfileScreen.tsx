
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const { colors, isDark } = useTheme();

  const menuItems = [
    'Edit Profile',
    'Bank Accounts',
    'Security',
    'Notifications',
    'Theme',
    'Language',
    'Currency',
    'Help & Support',
  ];

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? colors.background
            : '#F8FAFC',
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDark
              ? colors.surface
              : '#C9A84C',
          },
        ]}
      >
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
          }}
          style={styles.avatar}
        />

        <Text
          style={[
            styles.name,
            {
              
              color: colors.textPrimary,
            },
          ]}
        >
          Harshith Kasetti
        </Text>

        <Text
          style={[
            styles.email,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          harshith@example.com
        </Text>

        <TouchableOpacity
          style={[
            styles.editBtn,
            {
              backgroundColor: isDark
                ? colors.neonCyan
                : '#14B8A6',
            },
          ]}
        >
          <Text style={styles.editText}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats Row 1 */}
      <View style={styles.statsContainer}>
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
          <Text
            style={[
              styles.statValue,
              {
                color: isDark
                  ? colors.neonCyan
                  : '#0F766E',
              },
            ]}
          >
            ₹85,000
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            Total Savings
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
          <Text
            style={[
              styles.statValue,
              {
                color: isDark
                  ? colors.neonGreen
                  : '#0F766E',
              },
            ]}
          >
            6
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            Active Goals
          </Text>
        </View>
      </View>

      {/* Stats Row 2 */}
      <View style={styles.statsContainer}>
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
          <Text
            style={[
              styles.statValue,
              {
                color: isDark
                  ? colors.neonPurple
                  : '#0F766E',
              },
            ]}
          >
            89%
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            Goal Progress
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
          <Text
            style={[
              styles.statValue,
              {
                color: isDark
                  ? colors.neonGreen
                  : '#0F766E',
              },
            ]}
          >
            ₹12,500
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            Monthly Saved
          </Text>
        </View>
      </View>

      {/* Settings */}
      <View
        style={[
          styles.menuCard,
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
              color: colors.textPrimary,
            },
          ]}
        >
          Account Settings
        </Text>

        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              {
                borderBottomColor: colors.border,
              },
            ]}
            onPress={() => {
              if (item === 'Theme') {
                navigation.navigate('ThemeSettings');
              } else if (item === 'Language') {
                navigation.navigate('Language');
              } else if (item === 'Currency') {
                navigation.navigate('Currency');
              }
            }}
          >
            <Text
              style={[
                styles.menuText,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              {item}
            </Text>

            <Text
              style={[
                styles.arrow,
                {
                  color: colors.textTertiary,
                },
              ]}
            >
              ›
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Premium */}
      <View
        style={[
          styles.premiumCard,
          {
            backgroundColor: isDark
              ? colors.surface
              : '#0F172A',
          },
        ]}
      >
        <Text
          style={[
            styles.premiumTitle,
            {
              color: isDark
                ? colors.neonCyan
                : '#FACC15',
            },
          ]}
        >
          FutureFund Premium
        </Text>

        <Text
          style={[
            styles.premiumDesc,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          Unlock advanced analytics, AI savings predictions and premium
          investment opportunities.
        </Text>

        <TouchableOpacity
          style={[
            styles.upgradeBtn,
            {
              backgroundColor: isDark
                ? colors.neonCyan
                : '#FACC15',
            },
          ]}
        >
          <Text style={styles.upgradeText}>
            Upgrade Now
          </Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          navigation.getParent()?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            }),
          );
        }}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
  },

  name: {
    fontSize: 24,
    fontWeight: '700',
  },

  email: {
    marginTop: 5,
    marginBottom: 15,
  },

  editBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  editText: {
    color: '#fff',
    fontWeight: '600',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },

  statCard: {
    width: '48%',
    padding: 20,
    borderRadius: 18,
    elevation: 3,
  },

  statValue: {
    fontSize: 22,
    fontWeight: '700',
  },

  statLabel: {
    marginTop: 5,
  },

  menuCard: {
    margin: 20,
    borderRadius: 20,
    padding: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },

  menuText: {
    fontSize: 16,
  },

  arrow: {
    fontSize: 20,
  },

  premiumCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
  },

  premiumTitle: {
    fontSize: 22,
    fontWeight: '700',
  },

  premiumDesc: {
    marginTop: 10,
    lineHeight: 22,
  },

  upgradeBtn: {
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 15,
  },

  upgradeText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#000',
  },

  logoutBtn: {
    marginHorizontal: 20,
    marginTop: 25,
    backgroundColor: '#DC2626',
    paddingVertical: 15,
    borderRadius: 15,
  },

  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ProfileScreen;
