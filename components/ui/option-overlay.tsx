import React from 'react';
import { motion } from 'framer-motion';

interface OptionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: 'onchain' | 'offchain') => void;
}

const OptionOverlay: React.FC<OptionOverlayProps> = ({ isOpen, onClose, onSelect }) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 right-0 w-64 bg-gray-800 shadow-lg z-50"
    >
      <div className="flex flex-col h-full">
        <button onClick={onClose} className="absolute top-4 right-4 text-white">
          &times;
        </button>
        <div className="flex-1 flex flex-col justify-center">
          <button
            onClick={() => onSelect('onchain')}
            className="text-white text-lg py-4 hover:bg-gray-700 transition-colors"
          >
            Onchain
          </button>
          <div className="border-t border-gray-700 my-2"></div>
          <button
            onClick={() => onSelect('offchain')}
            className="text-white text-lg py-4 hover:bg-gray-700 transition-colors"
          >
            Offchain
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OptionOverlay;
