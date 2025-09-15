import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Order } from '../../types';

interface OrderStatusProps {
  order: Order;
}

export function OrderStatus({ order }: OrderStatusProps) {
  const statusSteps = [
    { status: 'pending', icon: Clock, label: 'Order Placed' },
    { status: 'processing', icon: Package, label: 'Processing' },
    { status: 'shipped', icon: Truck, label: 'Shipped' },
    { status: 'delivered', icon: CheckCircle, label: 'Delivered' }
  ];

  const currentStep = statusSteps.findIndex(step => step.status === order.status);

  return (
    <div className="flex justify-between items-center w-full mt-4">
      {statusSteps.map((step, index) => {
        const StepIcon = step.icon;
        const isCompleted = index <= currentStep;
        const isActive = index === currentStep;
        
        return (
          <div key={step.status} className="flex flex-col items-center flex-1">
            <div className={`
              rounded-full p-2 mb-2
              ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}
              ${isActive ? 'ring-4 ring-green-200' : ''}
            `}>
              <StepIcon size={20} />
            </div>
            <span className={`text-sm ${isCompleted ? 'text-green-500' : 'text-gray-400'}`}>
              {step.label}
            </span>
            {index < statusSteps.length - 1 && (
              <div className={`h-0.5 w-full mt-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}