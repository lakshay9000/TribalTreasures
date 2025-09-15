import { useState } from 'react';
import { auth } from '../../lib/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onClose: () => void;
  isSeller: boolean;
}

export function LoginForm({ onClose, isSeller }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user, error } = await auth.signIn(email, password);

      if (error) {
        toast.error(error);
        return;
      }

      if (user) {
        // Check if the user type matches the login attempt
        if (user.isSeller !== isSeller) {
          toast.error(
            isSeller 
              ? 'This account is not registered as a seller. Please use the customer login.' 
              : 'This is a seller account. Please use the seller login.'
          );
          await auth.signOut();
          setLoading(false);
          return;
        }

        toast.success('Successfully logged in!');
        onClose();
        navigate(user.isSeller ? '/seller' : '/dashboard');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}