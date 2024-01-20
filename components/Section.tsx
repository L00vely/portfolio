// Section.tsx
import { Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import useTranslation from 'next-translate/useTranslation'

interface SectionProps {
    children: React.ReactNode;
    flexDir: string;
    
    justifyContent: string;
    alignItems: string;
}

const Section: React.FC<SectionProps> = (SectionProps) => {
  const { children, flexDir, justifyContent, alignItems } = SectionProps;

  const bg =  useColorModeValue("colors.white", "brand.primary")

  return (
    <Flex
      as='section'
      h="100vh"
      bg={ bg }
      p="2rem"
      gap="2rem"
      flexDirection={ flexDir }
      justify={ justifyContent }
      align={ alignItems }
    >
      { children }

    </Flex>
  );
};

export default Section;
