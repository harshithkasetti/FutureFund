// FutureFund API Service Layer

// ─── Types ─────────────────────────────────────────────

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type PaginatedResponse<T> = {
  success: boolean;
  data: T[];
  page: number;
  limit: number;
  total: number;
};

// Temporary types (replace with ../types later if available)
export type User = any;
export type Goal = any;
export type Wallet = any;
export type Transaction = any;
export type VaultDeposit = any;
export type GroupGoal = any;
export type AutoSaveRule = any;
export type MarketplaceItem = any;
export type AnalyticsData = any;
export type Notification = any;

// ─── Config ────────────────────────────────────────────

const BASE_URL = 'https://api.futurefund.app/v1';

// ─── HTTP Client ────────────────────────────────────────

class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Network error');
    }
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  patch<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();

// ─── Auth API ───────────────────────────────────────────

export const authApi = {
  login: async (phone: string, password: string) => {
    return {
      success: true,
      data: {
        token: 'futurefund-demo-token',
        user: {
          id: '1',
          name: 'Harshith',
          phone,
          email: 'demo@futurefund.com',
        },
      },
    };
  },

  signup: async (data: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }) => {
    return {
      success: true,
      message: 'Signup successful',
    };
  },

  verifyOtp: async (phone: string, otp: string) => {
    return {
      success: true,
      data: {
        token: 'futurefund-demo-token',
        user: {
          id: '1',
          name: 'Harshith',
        },
      },
    };
  },

  resendOtp: async (phone: string) => ({
    success: true,
    message: 'OTP sent',
  }),

  forgotPassword: async (phone: string) => ({
    success: true,
    message: 'Reset link sent',
  }),

  resetPassword: async (token: string, password: string) => ({
    success: true,
    message: 'Password reset successful',
  }),

  logout: async () => ({
    success: true,
  }),

  refreshToken: async () => ({
    success: true,
    token: 'futurefund-demo-token',
  }),
};

// ─── User API ───────────────────────────────────────────

export const userApi = {
  getProfile: () => apiClient.get<User>('/user/profile'),

  updateProfile: (data: Partial<User>) =>
    apiClient.patch<User>('/user/profile', data),

  uploadAvatar: async (uri: string) => {
    return {
      success: true,
      data: {
        avatarUrl: uri,
      },
    };
  },

  deleteAccount: () =>
    apiClient.delete<{ message: string }>('/user/account'),
};

// ─── Goals API ──────────────────────────────────────────

export const goalsApi = {
  getAll: () => apiClient.get<Goal[]>('/goals'),

  getById: (id: string) => apiClient.get<Goal>(`/goals/${id}`),

  create: (
    data: Omit<Goal, 'id' | 'savedAmount' | 'status' | 'createdAt' | 'updatedAt'>
  ) => apiClient.post<Goal>('/goals', data),

  update: (id: string, data: Partial<Goal>) =>
    apiClient.patch<Goal>(`/goals/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<{ message: string }>(`/goals/${id}`),

  contribute: (id: string, amount: number) =>
    apiClient.post<Goal>(`/goals/${id}/contribute`, { amount }),

  withdraw: (id: string, amount: number) =>
    apiClient.post<Goal>(`/goals/${id}/withdraw`, { amount }),
};

// ─── Wallet API ─────────────────────────────────────────

export const walletApi = {
  getWallet: () => apiClient.get<Wallet>('/wallet'),

  getTransactions: (page = 1, limit = 20) =>
    apiClient.get<PaginatedResponse<Transaction>>(
      `/wallet/transactions?page=${page}&limit=${limit}`
    ),

  deposit: (amount: number, method: string) =>
    apiClient.post<Transaction>('/wallet/deposit', { amount, method }),

  withdraw: (amount: number, accountDetails: Record<string, string>) =>
    apiClient.post<Transaction>('/wallet/withdraw', { amount, accountDetails }),

  transfer: (toUserId: string, amount: number, note?: string) =>
    apiClient.post<Transaction>('/wallet/transfer', {
      toUserId,
      amount,
      note,
    }),
};

// ─── Vault API ──────────────────────────────────────────

export const vaultApi = {
  getDeposits: () => apiClient.get<VaultDeposit[]>('/vault'),

  deposit: (amount: number, plan: string) =>
    apiClient.post<VaultDeposit>('/vault/deposit', { amount, plan }),

  getPlans: () =>
    apiClient.get<
      { plan: string; rate: number; minAmount: number; duration: number }[]
    >('/vault/plans'),

  breakDeposit: (depositId: string) =>
    apiClient.post<{ message: string }>(`/vault/${depositId}/break`, {}),
};

// ─── AutoSave API ───────────────────────────────────────

export const autoSaveApi = {
  getRules: () => apiClient.get<AutoSaveRule[]>('/autosave'),

  createRule: (
    data: Omit<
      AutoSaveRule,
      'id' | 'totalSaved' | 'createdAt' | 'nextSaveDate'
    >
  ) => apiClient.post<AutoSaveRule>('/autosave', data),

  updateRule: (id: string, data: Partial<AutoSaveRule>) =>
    apiClient.patch<AutoSaveRule>(`/autosave/${id}`, data),

  deleteRule: (id: string) =>
    apiClient.delete<{ message: string }>(`/autosave/${id}`),

  toggleRule: (id: string, isActive: boolean) =>
    apiClient.patch<AutoSaveRule>(`/autosave/${id}/toggle`, { isActive }),
};

// ─── Group Goals API ────────────────────────────────────

export const groupGoalsApi = {
  getAll: () => apiClient.get<GroupGoal[]>('/group-goals'),

  getById: (id: string) =>
    apiClient.get<GroupGoal>(`/group-goals/${id}`),

  create: (data: {
    title: string;
    description: string;
    targetAmount: number;
    deadline: string;
    emoji: string;
  }) => apiClient.post<GroupGoal>('/group-goals', data),

  join: (inviteCode: string) =>
    apiClient.post<GroupGoal>('/group-goals/join', { inviteCode }),

  contribute: (id: string, amount: number) =>
    apiClient.post<GroupGoal>(`/group-goals/${id}/contribute`, { amount }),

  leave: (id: string) =>
    apiClient.post<{ message: string }>(`/group-goals/${id}/leave`, {}),

  delete: (id: string) =>
    apiClient.delete<{ message: string }>(`/group-goals/${id}`),
};

// ─── Marketplace API ────────────────────────────────────

export const marketplaceApi = {
  getItems: (category?: string) =>
    apiClient.get<MarketplaceItem[]>(
      `/marketplace${category ? `?category=${category}` : ''}`
    ),

  getItem: (id: string) =>
    apiClient.get<MarketplaceItem>(`/marketplace/${id}`),
};

// ─── Analytics API ──────────────────────────────────────

export const analyticsApi = {
  getSummary: (period: 'week' | 'month' | 'quarter' | 'year') =>
    apiClient.get<AnalyticsData>(`/analytics?period=${period}`),
};

// ─── Notifications API ──────────────────────────────────

export const notificationsApi = {
  getAll: () => apiClient.get<Notification[]>('/notifications'),

  markRead: (id: string) =>
    apiClient.patch<Notification>(`/notifications/${id}/read`, {}),

  markAllRead: () =>
    apiClient.post<{ message: string }>(
      '/notifications/mark-all-read',
      {}
    ),

  delete: (id: string) =>
    apiClient.delete<{ message: string }>(`/notifications/${id}`),

  getUnreadCount: () =>
    apiClient.get<{ count: number }>('/notifications/unread-count'),
};