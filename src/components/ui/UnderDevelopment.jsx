import React from 'react';

const UnderDevelopment = ({ 
  title = "Under Development", 
  message = "This feature is currently under development. Stay tuned for updates!",
  icon = "construction"
}) => {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-surface-container rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-5xl md:text-6xl">
              {icon}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface font-headline">
            {title}
          </h2>
          <p className="text-outline font-body text-sm md:text-base px-4">
            {message}
          </p>
        </div>

        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
        </div>

        <button 
          onClick={() => window.history.back()}
          className="mt-6 px-6 py-2.5 rounded-lg font-semibold text-on-primary bg-gradient-to-br from-primary to-primary-container shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UnderDevelopment;