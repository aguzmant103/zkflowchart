'use client'

import React, { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import ConnectingLine from './connecting-line'
import FullPageOverlay from './full-page-overlay'

interface AnimatedPlusSignProps {
  onAddBlock: (blockName: string) => void;
}

const AnimatedPlusSign: React.FC<AnimatedPlusSignProps> = ({ onAddBlock }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handlePlusClick = () => {
    setIsOverlayOpen(true);
  };

  const handleOverlayClose = () => {
    setIsOverlayOpen(false);
  };

  const handleBlockSelect = (blockName: string) => {
    onAddBlock(blockName);
    setIsOverlayOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-center my-2">
        <ConnectingLine />
        <motion.div
          className="my-2"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePlusClick}
        >
          <PlusCircle className="text-purple-500 cursor-pointer" size={24} />
        </motion.div>
        <ConnectingLine />
      </div>
      <FullPageOverlay
        isOpen={isOverlayOpen}
        onClose={handleOverlayClose}
        onSelect={handleBlockSelect}
      />
    </>
  )
}

export default AnimatedPlusSign
