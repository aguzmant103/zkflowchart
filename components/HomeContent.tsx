'use client';

import React, { useState, useEffect } from 'react';
import FlowCard from "@/components/ui/flow-card";
import AnimatedPlusSign from "@/components/ui/animated-plus-sign";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Globe, Code, Lock, Shield, Eye, Settings, MessageCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false });

interface FlowStep {
  id: number;
  title: string;
  type: 'Data Storage' | 'Target environment' | 'Language familiarity' | 'Gating Mechanism' | 'Post-Quantum' | 'Privacy Level';
  description: string;
  options: string[];
  icon: React.ElementType;
}

const cardTypes: Record<FlowStep['type'], { options: string[], icon: React.ElementType, description: string }> = {
  'Data Storage': {
    options: ['onchain', 'offchain', 'DA layer'],
    icon: Database,
    description: "Choose where to store your data"
  },
  'Target environment': {
    options: ['mobile native', 'mobile browser', 'laptop browser', 'server'],
    icon: Globe,
    description: "Select the target environment for your application"
  },
  'Language familiarity': {
    options: ['solidity', 'rust', 'circom', 'noir', 'cairo', 'leo'],
    icon: Code,
    description: "Choose the programming language you're most familiar with"
  },
  'Gating Mechanism': {
    options: ['country ID', 'passport', 'NFT', 'token balance', 'EAS', 'Zupass'],
    icon: Lock,
    description: "Select the gating mechanism for your application"
  },
  'Post-Quantum': {
    options: ['yes', 'no'],
    icon: Shield,
    description: "Decide if you want post-quantum security"
  },
  'Privacy Level': {
    options: ['public', 'private actions', 'private signups'],
    icon: Eye,
    description: "Choose the level of privacy for your application"
  }
};

const HomeContent: React.FC = () => {
  const [steps, setSteps] = useState<FlowStep[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setSteps([
      { 
        id: 1, 
        title: "Data Storage", 
        type: 'Data Storage',
        description: cardTypes['Data Storage'].description,
        options: cardTypes['Data Storage'].options,
        icon: cardTypes['Data Storage'].icon
      }
    ]);
    setIsLoaded(true);
    
    // Set window dimensions after component mounts
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Add event listener for window resize
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOptionSelect = (id: number, option: string) => {
    setSteps(steps.map(step => 
      step.id === id 
        ? { ...step, title: `${step.type} (${option})` }
        : step
    ));
  };

  const handleAddBlock = (blockName: FlowStep['type']) => {
    const newStep: FlowStep = {
      id: steps.length + 1,
      title: blockName,
      type: blockName,
      description: cardTypes[blockName].description,
      options: cardTypes[blockName].options,
      icon: cardTypes[blockName].icon
    };
    setSteps([...steps, newStep]);
  };

  const handleGetRecommendation = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
    // Here you would typically generate and display the recommendation
  };

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  return (
    <main className="relative min-h-screen bg-gray-900 p-24">
      {showConfetti && windowDimensions.width > 0 && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
        />
      )}
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-white text-center">
          <h1 className="text-4xl font-bold mb-4">zkFlowChart – Privacy Tooling Recommender</h1>
          <p className="text-lg mb-6">
            Discover available tooling to build privacy-preserving systems with zkFlowChart, 
            a dynamic tool designed to match your needs with the right solutions. Think of it 
            as a product recommender for zero-knowledge technologies.
          </p>
          <div className="w-full bg-gray-700 h-2 rounded-full mb-6">
            <div 
              className="bg-purple-500 h-full rounded-full transition-all duration-500 ease-in-out" 
              style={{width: `${(steps.length / 6) * 100}%`}}
            ></div>
          </div>
          <p className="text-sm text-gray-400">{steps.length}/6 steps completed</p>
        </div>
        <div className="relative mb-12">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center mb-4">
                <div className="bg-purple-500 rounded-full w-8 h-8 flex items-center justify-center mr-4">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <FlowCard
                  title={step.title}
                  description={step.description}
                  onSelect={(option: string) => handleOptionSelect(step.id, option)}
                  options={step.options}
                  icon={step.icon}
                  isHorizontal={true}
                />
              </div>
              {index < steps.length - 1 && (
                <div className="ml-4 pl-4 border-l-2 border-purple-500 h-8"></div>
              )}
            </React.Fragment>
          ))}
          {steps.length < 6 && (
            <AnimatedPlusSign onAddBlock={(blockName: string) => {
              if (blockName in cardTypes) {
                handleAddBlock(blockName as FlowStep['type']);
              }
            }} />
          )}
        </div>

        {/* Generate Recommendation Card */}
        <Card className="w-full bg-indigo-700 text-white mb-12 hover:bg-indigo-600 transition-colors duration-200 cursor-pointer">
          <CardContent className="p-8 text-center">
            <Button 
              className="text-2xl font-bold mb-4 bg-white text-indigo-700 hover:bg-gray-200 transition-colors duration-200"
              onClick={handleGetRecommendation}
            >
              <Settings className="mr-2" />
              Get Your Personalized Recommendation
            </Button>
            <p className="text-lg">Click above to generate a recommendation based on your selections.</p>
          </CardContent>
        </Card>

        {/* Footer with Contact Us Section */}
        <footer className="bg-gray-800 rounded-lg p-6 text-white text-center">
          <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
          <p className="mb-4">Have questions or need assistance? We&apos;re here to help!</p>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-purple-800"
              onClick={() => window.open('https://www.pse.dev', '_blank')}
            >
              Visit PSE Website
            </Button>
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-purple-800"
              onClick={() => setShowChat(!showChat)}
            >
              <MessageCircle className="mr-2" />
              {showChat ? 'Close Chat' : 'Open Chat'}
            </Button>
          </div>
        </footer>

        {/* Chat Bubble */}
        {showChat && (
          <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-lg p-4">
            <h4 className="text-lg font-bold mb-2">Chat with Us</h4>
            {/* Add chat component here */}
            <p>Chat functionality coming soon!</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default HomeContent;
