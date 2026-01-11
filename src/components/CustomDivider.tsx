import React from 'react';

const CustomDivider: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center py-6">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-muted-foreground/20" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          
        </span>
      </div>
    </div>
  );
};

export default CustomDivider;
