import React from 'react';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileAvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ 
  name, 
  imageUrl,
  size = 'sm',
  className = '' 
}) => {
  const getInitials = (fullName: string): string => {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={cn(
          'rounded-full object-cover border-2 border-border',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium border-2 border-primary/20',
        sizeClasses[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
};

export default ProfileAvatar;
