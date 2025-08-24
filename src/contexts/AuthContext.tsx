import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

export type UserRole = 'patient' | 'therapist';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  profile_pic?: string;
  company_name?: string;
  phone_number?: string;
  experience?: number;
  expertise?: string[];
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session) {
        // Fetch user profile from the database
        await getProfile(session.user.id);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const getProfile = async (id: string) => {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load user profile.');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        await getProfile(data.user.id);
        toast.success(`Welcome back!`);
        navigate(`/${user?.role}`);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User>, password: string) => {
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email!,
        password: password,
      });

      if (authError) throw authError;

      const { data, error } = await supabase.from('profiles').insert([
        {
          id: authData.user?.id,
          email: userData.email,
          role: userData.role,
          name: userData.name,
          profile_pic: userData.profile_pic,
          company_name: userData.company_name,
          phone_number: userData.phone_number,
          experience: userData.experience,
          expertise: userData.expertise,
          bio: userData.bio,
        },
      ]);

      if (error) throw error;

      setUser(userData as User);
      toast.success('Registration successful!');
      navigate(`/${userData.role}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const updateProfile = async (data: Partial<User>) => {
    setLoading(true);
    try {
      if (user) {
        const { error } = await supabase.from('profiles').update(data).eq('id', user.id);
        if (error) throw error;
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        toast.success('Profile updated successfully');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
