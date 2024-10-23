import React from 'react';
import { motion } from 'framer-motion';
import { X, Database, Globe, Code, Lock, Shield } from 'lucide-react';

interface FullPageOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
}

const buildingBlocks = [
  { name: 'Data Storage', icon: Database },
  { name: 'Target environment', icon: Globe },
  { name: 'Language familiarity', icon: Code },
  { name: 'Gating Mechanism', icon: Lock },
  { name: 'Post-Quantum', icon: Shield },
];

const FullPageOverlay: React.FC<FullPageOverlayProps> = ({ isOpen, onClose, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center ${isOpen ? '' : 'pointer-events-none'}`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: isOpen ? 1 : 0.9, opacity: isOpen ? 1 : 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 p-8 rounded-lg w-full max-w-4xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Choose building block</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {buildingBlocks.map((block) => (
            <button
              key={block.name}
              onClick={() => onSelect(block.name)}
              className="bg-gray-700 p-4 rounded-lg flex flex-col items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <block.icon size={32} className="text-purple-500 mb-2" />
              <span className="text-white text-center">{block.name}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FullPageOverlay;
