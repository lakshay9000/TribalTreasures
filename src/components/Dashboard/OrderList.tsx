import { Order } from '../../types';
import { OrderStatus } from './OrderStatus';

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  return (
    <div className="space-y-6">
      {orders.map(order => (
        <div key={order.id} className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
              <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <span className="text-xl font-bold text-amber-900">${order.total.toFixed(2)}</span>
          </div>
          
          <OrderStatus order={order} />
          
          <div className="mt-6 border-t border-gray-200 pt-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {order.trackingNumber && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Tracking Number: <span className="font-medium">{order.trackingNumber}</span>
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}