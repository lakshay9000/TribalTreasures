import { useState } from 'react';
import { Edit2, Save, Package, ShoppingBag, BarChart2, User, Trash2, Plus, AlertTriangle, TrendingUp, Users, DollarSign, Box, X } from 'lucide-react';
import { auth } from '../lib/auth';
import toast from 'react-hot-toast';
import { products, orders } from '../data';

function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  tribe: string;
  stock: string;
  image: string;
}

export function SellerDashboard() {
  const user = auth.getCurrentUser();
  const [activeTab, setActiveTab] = useState<'profile' | 'products' | 'orders' | 'analytics'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    shopName: user?.shopName || '',
    shopDescription: user?.shopDescription || ''
  });

  const [productForm, setProductForm] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    tribe: '',
    stock: '',
    image: ''
  });

  if (!user) {
    return null;
  }

  const initials = getInitials(user.name);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { user: updatedUser, error } = await auth.updateProfile(user.id, {
      ...formData,
      isSeller: true
    });
    
    if (error) {
      toast.error(error);
      return;
    }

    if (updatedUser) {
      toast.success('Profile updated successfully');
      setIsEditing(false);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual product addition
    toast.success('Product added successfully');
    setIsAddingProduct(false);
    setProductForm({
      name: '',
      description: '',
      price: '',
      tribe: '',
      stock: '',
      image: ''
    });
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: 'processing' | 'shipped' | 'delivered') => {
    // TODO: Implement actual status update
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
    setSelectedOrder(null);
  };

  const stats = {
    revenue: {
      total: 125000,
      growth: 12.5,
      period: 'vs last month'
    },
    orders: {
      total: 84,
      growth: 8.2,
      period: 'vs last month'
    },
    customers: {
      total: 156,
      growth: 15.3,
      period: 'vs last month'
    },
    inventory: {
      total: 32,
      growth: -5.8,
      period: 'vs last month'
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 }
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
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
            {activeTab === 'profile' && (
              <div className="max-w-2xl">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Seller Profile</h2>
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
                      <label className="block text-sm font-medium text-gray-700">Shop Name</label>
                      <input
                        type="text"
                        value={formData.shopName}
                        onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Shop Description</label>
                      <textarea
                        value={formData.shopDescription}
                        onChange={(e) => setFormData({ ...formData, shopDescription: e.target.value })}
                        rows={3}
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
                    <button
                      type="submit"
                      className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <div className="space-y-6">
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
                    {user.shopName && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Shop Name</h4>
                        <p className="text-gray-900">{user.shopName}</p>
                      </div>
                    )}
                    {user.shopDescription && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Shop Description</h4>
                        <p className="text-gray-900">{user.shopDescription}</p>
                      </div>
                    )}
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
                  </div>
                )}
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Product Management</h2>
                  <button 
                    onClick={() => setIsAddingProduct(true)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Add Product
                  </button>
                </div>

                {isAddingProduct && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Add New Product</h3>
                        <button 
                          onClick={() => setIsAddingProduct(false)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <form onSubmit={handleAddProduct} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Product Name</label>
                          <input
                            type="text"
                            required
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            required
                            value={productForm.description}
                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                          <input
                            type="number"
                            required
                            min="0"
                            value={productForm.price}
                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Tribe</label>
                          <input
                            type="text"
                            required
                            value={productForm.tribe}
                            onChange={(e) => setProductForm({ ...productForm, tribe: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Stock</label>
                          <input
                            type="number"
                            required
                            min="0"
                            value={productForm.stock}
                            onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Image URL</label>
                          <input
                            type="url"
                            required
                            value={productForm.image}
                            onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700"
                        >
                          Add Product
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* Low Stock Alerts */}
                <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-yellow-800 mb-2">
                    <AlertTriangle size={20} />
                    <h3 className="font-medium">Low Stock Alerts</h3>
                  </div>
                  <p className="text-sm text-yellow-600">
                    3 products are running low on stock. Consider restocking soon.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tribe
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.name}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.tribe}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">₹{product.price}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">10</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-amber-600 hover:text-amber-900 mr-4">
                              <Edit2 className="h-5 w-5" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Management</h2>
                
                {/* Order Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="text-green-800 font-medium mb-2">New Orders</h3>
                    <p className="text-2xl font-bold text-green-900">12</p>
                    <p className="text-sm text-green-600">Awaiting processing</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-blue-800 font-medium mb-2">Processing</h3>
                    <p className="text-2xl font-bold text-blue-900">8</p>
                    <p className="text-sm text-blue-600">Being prepared</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <h3 className="text-amber-800 font-medium mb-2">Shipped</h3>
                    <p className="text-2xl font-bold text-amber-900">15</p>
                    <p className="text-sm text-amber-600">In transit</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{order.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(order.date).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">John Doe</div>
                            <div className="text-sm text-gray-500">john@example.com</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                              ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => setSelectedOrder(order.id)}
                              className="text-amber-600 hover:text-amber-900"
                            >
                              Update Status
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Order Status Update Modal */}
                {selectedOrder && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                      <h3 className="text-lg font-medium mb-4">Update Order Status</h3>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleUpdateOrderStatus(selectedOrder, 'processing')}
                          className="w-full text-left px-4 py-2 rounded hover:bg-amber-50 text-amber-700"
                        >
                          Mark as Processing
                        </button>
                        <button
                          onClick={() => handleUpdateOrderStatus(selectedOrder, 'shipped')}
                          className="w-full text-left px-4 py-2 rounded hover:bg-amber-50 text-amber-700"
                        >
                          Mark as Shipped
                        </button>
                        <button
                          onClick={() => handleUpdateOrderStatus(selectedOrder, 'delivered')}
                          className="w-full text-left px-4 py-2 rounded hover:bg-amber-50 text-amber-700"
                        >
                          Mark as Delivered
                        </button>
                        <button
                          onClick={() => setSelectedOrder(null)}
                          className="w-full text-left px-4 py-2 rounded hover:bg-red-50 text-red-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Analytics Dashboard</h2>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {/* Revenue Card */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                      <span className={`${stats.revenue.growth >= 0 ? 'text-green-600' : 'text-red-600'} text-sm`}>
                        {stats.revenue.growth >= 0 ? '+' : ''}{stats.revenue.growth}%
                      </span>
                    </div>
                    <h3 className="text-gray-500 text-sm">Revenue</h3>
                    <p className="text-2xl font-bold">₹{stats.revenue.total.toLocaleString()}</p>
                    <p className="text-gray-400 text-xs mt-1">{stats.revenue.period}</p>
                  </div>

                  {/* Orders Card */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <ShoppingBag className="h-6 w-6 text-blue-600" />
                      </div>
                      <span className={`${stats.orders.growth >= 0 ? 'text-green-600' : 'text-red-600'} text-sm`}>
                        {stats.orders.growth >= 0 ? '+' : ''}{stats.orders.growth}%
                      </span>
                    </div>
                    <h3 className="text-gray-500 text-sm">Orders</h3>
                    <p className="text-2xl font-bold">{stats.orders.total}</p>
                    <p className="text-gray-400 text-xs mt-1">{stats.orders.period}</p>
                  </div>

                  {/* Customers Card */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      <span className={`${stats.customers.growth >= 0 ? 'text-green-600' : 'text-red-600'} text-sm`}>
                        {stats.customers.growth >= 0 ? '+' : ''}{stats.customers.growth}%
                      </span>
                    </div>
                    <h3 className="text-gray-500 text-sm">Customers</h3>
                    <p className="text-2xl font-bold">{stats.customers.total}</p>
                    <p className="text-gray-400 text-xs mt-1">{stats.customers.period}</p>
                  </div>

                  {/* Inventory Card */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-amber-100 p-3 rounded-full">
                        <Box className="h-6 w-6 text-amber-600" />
                      </div>
                      <span className={`${stats.inventory.growth >= 0 ? 'text-green-600' : 'text-red-600'} text-sm`}>
                        {stats.inventory.growth >= 0 ? '+' : ''}{stats.inventory.growth}%
                      </span>
                    </div>
                    <h3 className="text-gray-500 text-sm">Products in Stock</h3>
                    <p className="text-2xl font-bold">{stats.inventory.total}</p>
                    <p className="text-gray-400 text-xs mt-1">{stats.inventory.period}</p>
                  </div>
                </div>

                {/* Performance Charts */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Sales Trend */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Sales Trend</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          This Month
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                          Last Month
                        </span>
                      </div>
                    </div>
                    <div className="h-64 flex items-end space-x-2">
                      {[65, 45, 75, 55, 60, 45, 85, 65, 75, 50, 90, 55].map((height, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div className="w-full bg-amber-100 rounded-t" style={{ height: `${height}%` }}>
                            <div
                              className="w-full bg-amber-500 rounded-t transition-all duration-300"
                              style={{ height: `${height * 0.7}%` }}
                            ></div>
                          </div>
                          <span className="text-xs mt-1">{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Products */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-4">Top Products</h3>
                    <div className="space-y-4">
                      {products.slice(0, 4).map((product, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-gray-500">{product.tribe}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{product.price}</p>
                            <p className="text-sm text-green-600">+12% sales</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="font-medium mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">New order received</p>
                        <p className="text-sm text-gray-500">Order #1234 from John Doe</p>
                      </div>
                      <span className="ml-auto text-sm text-gray-500">2 min ago</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Product stock updated</p>
                        <p className="text-sm text-gray-500">Traditional Bamboo Basket: +5 units</p>
                      </div>
                      <span className="ml-auto text-sm text-gray-500">1 hour ago</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <ShoppingBag className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">Order shipped</p>
                        <p className="text-sm text-gray-500">Order #1232 has been shipped</p>
                      </div>
                      <span className="ml-auto text-sm text-gray-500">3 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}