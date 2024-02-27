/* eslint-disable react/no-children-prop */
import Head from 'next/head'
import { Card, Flex, Heading, Text, Image, Grid, HStack, Box, VStack, ScaleFade, useDisclosure, Button, Tooltip, Collapse, Divider, useColorModeValue, useBreakpointValue, Avatar, Skeleton, SkeletonCircle } from '@chakra-ui/react'
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

export default function About(props: Props) {
  const { locale, altLocale } = props;

  const { t } = useTranslation()

  const title = t('pages:about');

  const certificatesTitle = t('pages:certificates');

  const skillsTitle = t('pages:skills');

  const credentialTitle = t('about:credential')

  const { memorizedSkills, isLoading: skillsLoaded } = useGetSkills(locale, altLocale);

  const { memorizedCertificates, isLoading: certificatesLoaded } = useGetCertificates(locale);

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

              <Skeleton isLoaded={!skillsLoaded} w="100%" h="100%">
                <Grid
                  templateColumns={["repeat(1, 1fr)","repeat(1, 1fr)","repeat(3, 1fr)", "repeat(5, 1fr)"]}
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
                          boxShadow="none"
                          p="1rem"
                        >
                          <HStack h="100%" align="center" >
                              <Image src={ icon } alt={ name } w="auto" h="auto"/>

                              <Text color="colors.gray"> { name }</Text>
                          </HStack>                    
                        </Card>
                      )
                    })
                  }
                </Grid>
              </Skeleton>
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
              
              <Skeleton isLoaded={!certificatesLoaded} w="100%" h="100%"> 
                <Grid
                  templateColumns={["repeat(1, 1fr)","repeat(1, 1fr)","repeat(2, 1fr)","repeat(3, 1fr)"]}
                  autoRows="fit-content"
                  gap="1rem"
                  w="100%"
                >
                  {
                    memorizedCertificates.map((certificate, index) => {
                      const { certificate: image , date, name } = certificate;

                      const { month } = transformDate(date, locale)
                      const { year } = transformDate(date)

                      const openExternalLink = () => {
                        window.open(certificate.link, '_blank');
                      };

                      return(
                        <Card 
                          key={ index }
                          h="100%"
                          w="100%"
                          bg="colors.white"
                          boxShadow="none"
                          p="1rem"
                        >
                          
                          <VStack h="100%" w="100%" align="center" spacing="1rem" color="colors.gray">
                          
                            <Image alt={name} src={ image.url } w="32" h="32"/>
                            
                            <Divider />

                            <Text
                              fontSize="md"
                              fontWeight="bold"
                              alignSelf='flex-start'
                              w="100%"
                            >
                                { certificate.name }  
                            </Text>

                            <Text                   
                              fontSize="sm"
                              alignSelf='flex-start'
                            >
                              { certificate.provider }
                            </Text>

                            

                            <Text 
                              opacity=".75" 
                              fontSize="sm"
                              alignSelf='flex-start'
                            >
                              { `${month} ${year}` }
                            </Text>
                            

                            <Button 
                              aria-label= { credentialTitle }
                              onClick={openExternalLink} 
                              alignSelf='flex-start'
                              borderWidth="0.1rem"
                              borderStyle="solid"
                              borderColor="brand.secondary"                             
                              opacity=".75" 
                              color="brand.primary"
                              w="100%"
                              _hover={{
                                bg: "brand.secondary"
                              }}
                              justifyContent="space-between"
                            > 
                              <Text fontSize={["sm", "sm", "md", "md"]}>
                                { credentialTitle }
                              </Text>
                              <ExternalLinkIcon />
                            </Button>
                          </VStack>                    
                          
                            
                        </Card>
                      )
                    })
                  }
                </Grid>
              </Skeleton>
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