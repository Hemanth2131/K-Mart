import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';



const Toast = ({ message, type = 'success', onClose }) => {
  return (
    <div
      className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm animate-slideIn border-2 ${
        type === 'success'
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-900'
          : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300 text-red-900'
      }`}
      style={{
        animation: 'slideIn 0.3s ease-out',
        boxShadow: type === 'success' 
          ? '0 20px 25px -5px rgba(34, 197, 94, 0.3), 0 10px 10px -5px rgba(34, 197, 94, 0.2)'
          : '0 20px 25px -5px rgba(239, 68, 68, 0.3), 0 10px 10px -5px rgba(239, 68, 68, 0.2)'
      }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-1.5 rounded-full ${
          type === 'success' 
            ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
            : 'bg-gradient-to-br from-red-500 to-rose-500'
        }`}>
          {type === 'success' ? (
            <Check className="w-5 h-5 text-white" strokeWidth={3} />
          ) : (
            <AlertCircle className="w-5 h-5 text-white" strokeWidth={3} />
          )}
        </div>
        <span className="font-semibold text-base">{message}</span>
        <button
          onClick={onClose}
          className={`ml-4 p-1 rounded-lg transition-all hover:scale-110 ${
            type === 'success'
              ? 'hover:bg-green-200/50'
              : 'hover:bg-red-200/50'
          }`}
          aria-label="Close notification"
        >
          <X className="w-5 h-5 opacity-60 hover:opacity-100 transition" />
        </button>
      </div>
      
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;