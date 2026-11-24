"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserPermissions } from "@/types";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  updatePermissions: (permissions: Partial<UserPermissions>) => void;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  deleteAccount: () => void;
}

const DEFAULT_PERMISSIONS: UserPermissions = {
  screenTimeConsented: false,
  healthSensorsConsented: false,
  locationContextConsented: false,
  anonymizedAnalyticsConsented: true,
};

const DEFAULT_DEMO_USER: UserProfile = {
  id: "usr_demo_882",
  name: "Alex V.",
  email: "alex@trisync.io",
  isOnboarded: true,
  ageRange: "26-34",
  mode: "professional",
  activityLevel: "moderate",
  schedule: {
    wakeTime: "06:45",
    sleepTime: "22:45",
    workStart: "09:00",
    workEnd: "18:00",
  },
  reminderTimes: ["08:30", "13:00", "21:30"],
  goals: [
    "Improve sleep habits",
    "Reduce unnecessary screen time",
    "Manage stress",
    "Build a balanced daily routine",
  ],
  permissions: {
    screenTimeConsented: true,
    healthSensorsConsented: true,
    locationContextConsented: false,
    anonymizedAnalyticsConsented: true,
  },
  syncScore: 86,
  streakDays: 14,
  createdAt: "2026-11-01",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from LocalStorage or provide clean demo state
  useEffect(() => {
    try {
      const stored = localStorage.getItem("trisync_session");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // We leave user unauthenticated initially so landing page shows Sign In / Get Started,
        // but demo account can be logged into instantly with 1-click
        setUser(null);
      }
    } catch (e) {
      console.warn("Storage access unavailable:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = (u: UserProfile | null) => {
    setUser(u);
    try {
      if (u) {
        localStorage.setItem("trisync_session", JSON.stringify(u));
      } else {
        localStorage.removeItem("trisync_session");
      }
    } catch (e) {
      console.warn("Storage write failed:", e);
    }
  };

  const signIn = async (email: string, _password?: string) => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 500)); // Smooth simulation

    if (!email || !email.includes("@")) {
      setIsLoading(false);
      return { success: false, error: "Please provide a valid email address." };
    }

    // Match or initialize user
    const loggedInUser: UserProfile = {
      ...DEFAULT_DEMO_USER,
      email,
      name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
    };

    saveUser(loggedInUser);
    setIsLoading(false);
    return { success: true };
  };

  const signUp = async (name: string, email: string, _password?: string) => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 600));

    if (!name || name.trim().length < 2) {
      setIsLoading(false);
      return { success: false, error: "Please enter your name." };
    }
    if (!email || !email.includes("@")) {
      setIsLoading(false);
      return { success: false, error: "Please enter a valid email address." };
    }

    const newUser: UserProfile = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      isOnboarded: false, // Redirects to onboarding flow!
      goals: [],
      permissions: DEFAULT_PERMISSIONS,
      syncScore: 70,
      streakDays: 1,
      createdAt: new Date().toISOString().split("T")[0],
    };

    saveUser(newUser);
    setIsLoading(false);
    return { success: true };
  };

  const signOut = () => {
    saveUser(null);
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      ...data,
      isOnboarded: true,
    };
    saveUser(updated);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      ...data,
    };
    saveUser(updated);
  };

  const updatePermissions = (permissions: Partial<UserPermissions>) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      permissions: {
        ...user.permissions,
        ...permissions,
      },
    };
    saveUser(updated);
  };

  const resetPassword = async (email: string) => {
    await new Promise((res) => setTimeout(res, 600));
    return {
      success: true,
      message: `Password reset instructions have been dispatched to ${email}.`,
    };
  };

  const deleteAccount = () => {
    saveUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
        completeOnboarding,
        updateProfile,
        updatePermissions,
        resetPassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
