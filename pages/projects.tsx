/* eslint-disable react/no-children-prop */
import Head from 'next/head'
import { Card, Flex, Heading, Text, Image, Grid, HStack, Box, VStack, ScaleFade, useDisclosure, Button, Tooltip, Collapse, Divider, useColorModeValue, useBreakpointValue, Avatar, Skeleton, SkeletonCircle, List, ListItem, ListIcon } from '@chakra-ui/react'
import { CalendarIcon, DownloadIcon, ExternalLinkIcon, MinusIcon } from '@chakra-ui/icons';

import useTranslation from 'next-translate/useTranslation';
import Section from '@/components/Section';
import useGetSkills from '@/hooks/useGetSkills';
import { ModificableCard } from '@/components';
import { transformDate } from '@/utils/transformDate';
import useGetCertificates from '@/hooks/useGetCertificates';
import useGetProjects from '@/hooks/useGetProjects';
import { GrGithub } from 'react-icons/gr';

interface Props {
  locale: string;
  altLocale: string;
  locales: string[];
}

export default function Projects(props: Props) {
  

  const { locale, altLocale } = props;

  const { t } = useTranslation('pages')

  const title = t('projects');

  const technologiesTitle = t('technologies')

  const { memorizedProjects, isLoading: projectsLoaded } = useGetProjects(locale);


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
                { title }
              </Heading>

              <Grid
                templateColumns={["repeat(1, 1fr)","repeat(2, 1fr)"]}
                autoRows="fit-content"
                gap="2rem"
                w="100%"
              >
                {
                  memorizedProjects.map((project, index) => {
                    const { name, thumbnail, deployLink, githubLink, description, technologies } = project;

                    const openExternalLink = (link: string): void => {
                      window.open(link, '_blank');
                    };
                  

                    return(
                      <Card 
                        key={ index }
                        h="100%"
                        w="100%"
                        bg="colors.white"
                        boxShadow="lg"
                        p="1rem"
                      >
                        <Skeleton isLoaded={!projectsLoaded}>
                          <VStack h="100%" w="100%" align="center" spacing="1rem" color="colors.gray">
                          
                            <Image alt={name} src={ thumbnail.url } w="100%" h="auto"/>
                            
                            <Divider />

                            <HStack w="100%" justify="space-between">
                              <Text
                                fontSize="md"
                                as="h2"
                                fontWeight="bold"
                                alignSelf='flex-start'
                                w="100%"
                              >
                                  { name }  
                              </Text>

                              {
                                githubLink ? (
                                  <Button 
                                    leftIcon={<GrGithub />} 
                                    onClick={() => 
                                      openExternalLink(githubLink)
                                    } 
                                    cursor="pointer"
                                    bg="brand.primary"
                                    p="1rem 1.5rem"
                                    color="colors.white"
                                  >
                                      Github   
                                  </Button>
                                ) : null
                              }

                              {
                                deployLink ? (
                                  <Button 
                                    leftIcon={<ExternalLinkIcon />} 
                                    onClick={() => 
                                      openExternalLink(deployLink)
                                    } 
                                    cursor="pointer"
                                    bg="brand.secondary"
                                    p="1rem 1.5rem"
                                    color="colors.white"
                                  >
                                    Deploy   
                                  </Button>
                                ) : null
                              }
                            </HStack>

                            
                            <Text                   
                              fontSize="md"
                              alignSelf='flex-start'
                              textAlign="left"
                            >
                              { description }
                            </Text>

                            <VStack w="100%">
                              <Text
                                fontSize="sm"
                                fontWeight="bold"
                                alignSelf='flex-start'
                                textAlign="left"
                              >
                                { technologiesTitle }
                              </Text>
                              <List w="100%" spacing={1} >
                                {
                                  technologies?.map(( technology, index ) => {
                                    return(
                                      <ListItem 
                                        key={ index }
                                        as="li"
                                        fontSize="sm"
                                        
                                      > 
                                        <ListIcon as={MinusIcon} color='brand.secondary' />
                                        { technology }
                                      </ListItem>
                                    )
                                  })
                                }
                              </List>
                            </VStack>

                            {/* <Text                   
                              fontSize="sm"
                              alignSelf='flex-start'
                            >
                              { deployLink }
                            </Text>                     */}

                            
                          </VStack>                    
                        </Skeleton>                   
                  
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