// Section.tsx
import { Flex } from '@chakra-ui/react';
import React from 'react';
import useTranslation from 'next-translate/useTranslation'

interface SectionProps {
    children: React.ReactNode;
    flexDir: string;
    backGroundColor: string;
    justifyContent: string;
    alignItems: string;
}

const Section: React.FC<SectionProps> = (SectionProps) => {
  const { children, flexDir, backGroundColor, justifyContent, alignItems } = SectionProps;

  // Traducir el label del botón de idiomas
  const { t } = useTranslation('common')
  const label = t('footer');

  return (
    <Flex
      as='section'
      flexDirection={flexDir}
      w="100vw"
      bg={ backGroundColor }
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
