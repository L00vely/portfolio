/* eslint-disable react/no-children-prop */
import Head from 'next/head'
import Image from 'next/image';
import { Card, Flex, Heading, Text, Grid, HStack, Box, VStack, ScaleFade, useDisclosure, Button, Tooltip, Collapse, Divider, Avatar, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { CalendarIcon, DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons';

import useTranslation from 'next-translate/useTranslation';
import Section from '@/components/Section';
import useGetSkills from '@/hooks/useGetSkills';
import { ModificableCard } from '@/components';
import { transformDate } from '@/utils/transformDate';
import useGetCertificates from '@/hooks/useGetCertificates';

interface Props {
  locale: string;
  altLocale: string;
  locales: string[];
}

export default function Home(props: Props) {

  const { isOpen, onToggle } = useDisclosure()
  
  const { locale, locales, altLocale } = props;

  const { t } = useTranslation()

  const info = [
    t('about:greeting'),
    t('about:name'),
    t('about:activity')
  ]

  const title = t('pages:home')

  const gridTemplateAreas = useBreakpointValue({
    base: `"avatar"
    "description"`,

    md: `"description avatar"`,
    
    lg: `"description avatar"`,

    xl: `"description avatar"`
  });

  const gridTemplateRows = useBreakpointValue({
    base: "1fr 1fr",

    md: "1fr",
    
    lg: "1fr",

    xl: "1fr"
  })

  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",

    md: "1fr 1fr",
    
    lg: "1fr 1fr",

    xl: "1fr 1fr"
  })

  const color = useColorModeValue("colors.gray", "colors.white")

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Personal Portfolio" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ABOUT ME */}

      <VStack w="100%" h="100%" spacing="0">
        <Section
          justifyContent="center"
          alignItems="center"
          children={
            <Grid
              templateAreas={ gridTemplateAreas }
              templateColumns={ gridTemplateColumns }
              gridTemplateRows={ gridTemplateRows }
              w="60%"
              gap="2rem"
            >
              <VStack 
                gridArea="description"
                alignItems="flex-start"
              >
                {
                  info.map((info,index) => (
                    <Heading 
                      key={index}
                      as='h1'
                      color={color}
                      w="auto"
                    > 
                      { info }
                    </Heading>
                  ))
                }
              </VStack>

              <Box gridArea="avatar">
                <Image
                  
                  width="256" 
                  height="256" 
                  alt='Avatar' 
                  src='https://images.ctfassets.net/29rp0bxqbuvh/1LN6pyw9NzC4pDPiBAYTEF/98f2982d922a677f24f583354b5f157e/OIG.2RhaA95CR4v-removebg-preview.png' 
                />
              </Box>
              

            </Grid>
          }
        />
      </VStack>
    </>
  )
}

export async function getStaticProps(props: Props){
  const { locale, locales } = props;

  const [ altLocale ] = locales.filter(lang => lang !== locale);

  return {
    props: {
      ...props,
      altLocale
    }
  }
}