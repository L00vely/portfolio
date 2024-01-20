// Header.tsx
import { GridItem, VStack, Text, Link, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import useTranslation from 'next-translate/useTranslation'

interface FooterProps {

}

const Footer: React.FC<FooterProps> = () => {

  // Traducir el label del botón de idiomas
  const { t } = useTranslation('common')
  const label = t('footer');
  const iconsMention = `${t('icons')}`

  const bg =  useColorModeValue("colors.white", "brand.primary")

  const color = useColorModeValue("colors.gray", "colors.white")

  return (
    <GridItem
      as='footer'
      area="footer"
      w="100vw"
      h="100%"
      bg={ bg }
      color= { color }
      p="2rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
    >
      
      <Text>{ label }</Text>
      <Text as="span">  
        { iconsMention }

        <Link as="a" href='https://icons8.com' textDecoration="underline" isExternal>
          Icons8
        </Link> 
      </Text>
    </GridItem>
  );
};

export default Footer;
