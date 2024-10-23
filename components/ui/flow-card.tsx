import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "./card";
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlowCardProps {
  title: string;
  description: string;
  onSelect: (option: string) => void;
  options: string[];
  icon: React.ElementType;
  isHorizontal?: boolean;
}

const FlowCard: React.FC<FlowCardProps> = ({ title, description, onSelect, options, icon: Icon, isHorizontal = false }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOverlayOpen && overlayRef.current) {
      const containerWidth = overlayRef.current.offsetWidth;
      const contentWidth = overlayRef.current.scrollWidth;
      if (contentWidth > containerWidth) {
        setScale(containerWidth / contentWidth);
      } else {
        setScale(1);
      }
    }
  }, [isOverlayOpen, options]);

  const handleCardClick = () => {
    setIsOverlayOpen(true);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOverlayOpen(false);
  };

  return (
    <Card 
      className="w-full bg-gray-800 text-white mb-4 hover:bg-gray-700 transition-colors duration-200 cursor-pointer relative overflow-hidden"
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Icon className="w-8 h-8 text-purple-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-400 mt-1">{description}</p>
            {selectedOption && (
              <p className="text-sm text-purple-400 mt-1">Selected: {selectedOption}</p>
            )}
          </div>
        </div>
      </CardContent>
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            ref={overlayRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-y-0 right-0 w-2/3 bg-gray-700 flex justify-center items-center overflow-hidden"
          >
            <div 
              className={`flex ${isHorizontal ? 'flex-row flex-wrap justify-center' : 'flex-col'} gap-4`}
              style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
            >
              {options.map((option) => (
                <button
                  key={option}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptionSelect(option);
                  }}
                  className="text-white text-lg px-6 py-3 bg-gray-600 hover:bg-gray-500 transition-colors rounded-md flex items-center justify-between whitespace-nowrap"
                >
                  {option}
                  <ChevronRight className="ml-2" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default FlowCard;
