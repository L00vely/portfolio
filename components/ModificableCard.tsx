import React from 'react'
import { Card } from '@chakra-ui/react';

interface CardProps {
    children: React.ReactNode;
    w: string;
    h: string;
    flexDir: string;
    backGroundColor?: string;
    justifyContent?: string;
    alignItems?: string;
    borderRadius?: string;
    padding?: string;
}

export const ModificableCard: React.FC<CardProps> = (CardProps) => {
  const { children, w, h, borderRadius, padding, backGroundColor, justifyContent, alignItems } = CardProps;
  
    return (
    <Card
      w={ w }
      h={ h }
      justify={ justifyContent }
      align={ alignItems }
      gap="1rem"
      bg={ backGroundColor }
      borderRadius={ borderRadius } 
      boxShadow="lg"
      p={ padding }
    >
        { children }
    </Card>
  )
}
