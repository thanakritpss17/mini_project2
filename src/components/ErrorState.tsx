import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'เกิดข้อผิดพลาดในการโหลดข้อมูล',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="w-16 h-16 text-error mb-4 animate-bounce" />
      <h3 className="text-xl font-bold mb-2">เชื่อมต่อล้มเหลว!</h3>
      <p className="text-base-content/70 mb-6">{message}</p>
      <button onClick={onRetry} className="btn btn-primary gap-2">
        <RefreshCw className="w-4 h-4" /> ลองใหม่อีกครั้ง (Retry)
      </button>
    </div>
  );
};