import { useState } from 'react';
import { OrderList } from '../components/Dashboard/OrderList';
import { orders } from '../data';
import { auth } from '../lib/auth';
import toast from 'react-hot-toast';
import { Edit2, Save } from 'lucide-react';

function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function Dashboard() {
  const user = auth.getCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });

  if (!user) {
    return null;
  }

  const initials = getInitials(user.name);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { user: updatedUser, error } = await auth.updateProfile(user.id, formData);
    
    if (error) {
      toast.error(error);
      return;
    }

    if (updatedUser) {
      toast.success('Profile updated successfully');
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-amber-600 hover:text-amber-700"
                >
                  {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
                    <input
                      type="url"
                      value={formData.avatar}
                      onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    {formData.avatar ? (
                      <img
                        src={formData.avatar}
                        alt={user.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-amber-600 text-white flex items-center justify-center text-2xl font-bold">
                        {initials}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-semibold">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  {user.phone && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Phone</h4>
                      <p className="text-gray-900">{user.phone}</p>
                    </div>
                  )}
                  {user.address && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Address</h4>
                      <p className="text-gray-900">{user.address}</p>
                    </div>
                  )}
                  {user.bio && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Bio</h4>
                      <p className="text-gray-900">{user.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Orders Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>
            <OrderList orders={orders} />
          </div>
        </div>
      </div>
    </div>
  );
}