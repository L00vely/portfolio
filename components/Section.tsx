// Section.tsx
import { Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import useTranslation from 'next-translate/useTranslation'

interface SectionProps {
    children: React.ReactNode;    
    justifyContent: string;
    alignItems: string;
}

const Section: React.FC<SectionProps> = (SectionProps) => {
  const { children, justifyContent, alignItems } = SectionProps;

  const bg =  useColorModeValue("colors.white", "brand.primary")

  return (
    <Flex
      as='section'
      flexDir="column"
      h="100%"
      w="100%"
      bg={ bg }
      p="2rem"
      gap="2rem"
      justify={ justifyContent }
      align={ alignItems }
    >
      { children }

    </Flex>
  );
};

export default Section;
