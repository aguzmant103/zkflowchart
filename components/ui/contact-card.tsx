import React from 'react';
import { Card, CardContent } from "./card";
import { motion } from "framer-motion";

interface ContactCardProps {
  onClick: () => void;
  position: { x: number; y: number };
  isChild: boolean;
  title: string;
  isOption?: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({ onClick, position, isChild, title, isOption = false }) => {
  return (
    <motion.div
      initial={isChild ? { scale: 0 } : { scale: 1 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ position: 'absolute', left: position.x, top: position.y }}
    >
      <Card 
        className={`${isOption ? 'w-[200px]' : 'w-[350px]'} bg-white cursor-pointer`} 
        onClick={onClick}
      >
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold">{title}</h3>
          {!isOption && <p className="text-sm text-gray-500">Click to choose environment</p>}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactCard;
