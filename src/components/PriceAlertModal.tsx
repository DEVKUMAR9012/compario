import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  currentPrice: number;
}

export default function PriceAlertModal({ isOpen, onClose, productName, currentPrice }: PriceAlertModalProps) {
  const [success, setSuccess] = useState(false);
  const [targetPrice, setTargetPrice] = useState(currentPrice * 0.95);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      onClose();
      setTimeout(() => setSuccess(false), 300); // Reset after close
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-text-primary/40 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-surface rounded-2xl shadow-xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-lg font-bold text-text-primary">Set Price Alert</h2>
              <button onClick={onClose} className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-background rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {success ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="w-12 h-12 bg-success/10 text-success rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">Alert Active</h3>
                  <p className="text-sm text-text-secondary">We'll notify you when the price drops below ₹{targetPrice.toLocaleString('en-IN')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Product</label>
                    <div className="text-sm font-medium text-text-primary">{productName}</div>
                    <div className="text-sm text-text-secondary mt-1">Current Price: <span className="font-bold text-text-primary">₹{currentPrice.toLocaleString('en-IN')}</span></div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Target Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary font-medium">₹</span>
                      <input 
                        type="number" 
                        value={targetPrice}
                        onChange={(e) => setTargetPrice(Number(e.target.value))}
                        className="w-full bg-background border border-border rounded-xl pl-8 pr-4 py-3 text-text-primary font-bold focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Notify Me</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-1 focus:ring-primary/20 accent-primary" defaultChecked />
                        <span className="text-sm text-text-primary">Email</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-1 focus:ring-primary/20 accent-primary" defaultChecked />
                        <span className="text-sm text-text-primary">Browser</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-primary text-white font-medium py-3.5 rounded-xl hover:bg-primary-dark transition-colors shadow-sm mt-2">
                    Create Alert
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
