import { useState } from 'react';
import { OrderList } from './OrderList';
import { userProfile, orders } from '../../data';
import { Settings, Package, User as UserIcon } from 'lucide-react';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'settings'>('orders');

  const tabs = [
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'settings', label: 'Settings', icon: Settings }
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
              <p className="text-gray-600">{userProfile.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`
                    py-4 px-1 inline-flex items-center space-x-2 border-b-2 font-medium text-sm
                    ${activeTab === id
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h2>
                <OrderList orders={orders} />
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="max-w-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <p className="mt-1 text-gray-900">{userProfile.address}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-gray-900">{userProfile.phone}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
                <p className="text-gray-600">Account settings and preferences will be added here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}