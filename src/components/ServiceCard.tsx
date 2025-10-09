import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Service } from '../content/services';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  // Dynamically get the icon component from lucide-react
  const IconComponent = (LucideIcons as any)[service.icon] as React.ComponentType<{ className?: string }>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
          {IconComponent && (
            <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {service.title}
        </h3>
        
        {/* Blurb */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {service.blurb}
        </p>
      </div>
    </div>
  );
};
