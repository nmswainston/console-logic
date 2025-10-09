import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { Service } from '../content/services';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  // Dynamically get the icon component from lucide-react
  const IconComponent = (LucideIcons as any)[service.icon] as React.ComponentType<{ className?: string }>;

  return (
    <div className="card p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <div className="w-12 h-12 bg-brand-600/10 rounded-lg flex items-center justify-center">
          {IconComponent && (
            <IconComponent className="w-6 h-6 text-brand-600" />
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-ink">
          {service.title}
        </h3>
        
        {/* Blurb */}
        <p className="text-ink/70 text-sm leading-relaxed">
          {service.blurb}
        </p>
      </div>
    </div>
  );
};
