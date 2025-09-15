interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  address?: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  isSeller?: boolean;
  shopName?: string;
  shopDescription?: string;
}

class Auth {
  async signUp(email: string, password: string, name: string, isSeller: boolean = false): Promise<{ user: User | null; error: string | null }> {
    try {
      // Simple demo implementation using localStorage
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        createdAt: new Date().toISOString(),
        isSeller,
      };

      localStorage.setItem('currentUser', JSON.stringify(user));
      return { user, error: null };
    } catch (error: any) {
      console.error('SignUp error:', error);
      return { user: null, error: error.message };
    }
  }

  async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      // Demo implementation - always succeeds with a mock user
      const user: User = {
        id: '123',
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString(),
        isSeller: email.includes('seller'),
      };

      localStorage.setItem('currentUser', JSON.stringify(user));
      return { user, error: null };
    } catch (error: any) {
      console.error('SignIn error:', error);
      return { user: null, error: error.message };
    }
  }

  async signOut(): Promise<void> {
    localStorage.removeItem('currentUser');
  }

  async updateProfile(userId: string, updates: Partial<Omit<User, 'id' | 'email'>>): Promise<{ user: User | null; error: string | null }> {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        throw new Error('No current user found');
      }

      const updatedUser = {
        ...currentUser,
        ...updates,
      };

      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return { user: updatedUser, error: null };
    } catch (error: any) {
      console.error('Update profile error:', error);
      return { user: null, error: error.message };
    }
  }

  getCurrentUser(): User | null {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }
}

export const auth = new Auth();