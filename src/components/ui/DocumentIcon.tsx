import React from 'react';

interface DocumentIconProps {
  type: string;
  className?: string;
}

const DocumentIcon: React.FC<DocumentIconProps> = ({ type, className = '' }) => {
  const getIcon = (docType: string): string => {
    switch (docType.toLowerCase()) {
      case 'visa':
        return '🛂';
      case 'passport':
        return '📘';
      case 'medical certificate':
      case 'medical':
        return '🩺';
      case 'migration card':
      case 'migration':
        return '📝';
      default:
        return '📄';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="text-base">{getIcon(type)}</span>
      <span>{type}</span>
    </span>
  );
};

export default DocumentIcon;
