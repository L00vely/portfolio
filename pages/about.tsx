/* eslint-disable react/no-children-prop */
import Head from 'next/head'
import { Card, Flex, Heading, Text, Image, Grid, HStack, Box, VStack, ScaleFade, useDisclosure, Button, Tooltip, Collapse, Divider, useColorModeValue, useBreakpointValue, Avatar } from '@chakra-ui/react'
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
  
  const { locale, altLocale } = props;

  const { t } = useTranslation('pages')

  const title = t('home');
  const certificatesTitle = t('certificates');
  const skillsTitle = t('skills');

  const { memorizedSkills } = useGetSkills(locale, altLocale);

  const { memorizedCertificates } = useGetCertificates(locale);

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

      <VStack w="100%" h="100%" spacing="0">
        <Section
          justifyContent="flex-start"
          alignItems="center"
          children={
            <VStack
              w="60%"
              spacing="1rem"
            >
              <Heading 
                as='h1'
                color={color}
                w="auto"
              > 
                { skillsTitle }
              </Heading>

              <Grid
                templateColumns={["repeat(2, 1fr)","repeat(6, 10rem)"]}
                autoRows="fit-content"
                gap="1rem"
                w="100%"
              >
                {
                  memorizedSkills.map((skill, index) => {
                    const { icon, name } = skill;

                    return(
                      <Card 
                        key="index" 
                        h="100%"
                        w="100%"
                        bg="colors.white"
                        boxShadow="lg"
                        p="1rem"
                      >
                        <VStack h="100%" w="100%" align="center" >
                          <Avatar src={ icon } size="16"/>

                          <VStack>
                            <Text color="colors.gray"> { name }</Text>
                          </VStack>
                        </VStack>                    
                      </Card>
                    )
                  })
                }
              </Grid>
              
              

            </VStack>
          }
        />

        <Section
          justifyContent="flex-start"
          alignItems="center"
          children={
            <VStack
              w="60%"
              spacing="1rem"
            >
              <Heading 
                as='h1'
                color={color}
                w="auto"
              > 
                { certificatesTitle }
              </Heading>

              <Grid
                templateColumns={["repeat(1, 1fr)","repeat(6, 12rem)"]}
                autoRows="fit-content"
                gap="1rem"
                w="100%"
              >
                {
                  memorizedCertificates.map((certificate, index) => {
                    const { certificate: image , date, name } = certificate;

                    const { month, year } = transformDate(date)

                    return(
                      <Card 
                        key="index" 
                        h="100%"
                        w="100%"
                        bg="colors.white"
                        boxShadow="lg"
                        p="1rem"
                      >
                        <VStack h="100%" w="100%" align="center" spacing="1rem" color="colors.gray">
                          <Image alt={name} src={ image.url } w="32" h="32"/>
                        
                          <Divider />

                          <HStack
                            alignSelf='flex-start'
                          >
                            <CalendarIcon />

                            <Text 
                              opacity=".75" 
                              fontSize="md"
                              fontWeight="bold"
                              
                            >
                              { `${month} ${year}` }
                            </Text>
                          </HStack>

                          <Text
                            fontSize="md"
                            fontWeight="bold"
                            alignSelf='flex-start'
                            w="100%"
                          >
                              { certificate.name }  
                          </Text>
                        </VStack>                    
                      </Card>
                    )
                  })
                }
              </Grid>
              
              

            </VStack>
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