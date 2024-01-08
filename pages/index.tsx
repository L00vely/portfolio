/* eslint-disable react/no-children-prop */
import Head from 'next/head'
import { Card, Flex, Heading, Text, Image, Grid, HStack, Box, VStack, ScaleFade, useDisclosure, Button, Tooltip } from '@chakra-ui/react'
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
  const { locale, locales, altLocale } = props;

  const { t } = useTranslation('pages')

  const title = t('home');
  const certificatesTitle = t('certificates');

  const { memorizedSkills } = useGetSkills(locale, altLocale);
  const { memorizedCertificates } = useGetCertificates(locale, altLocale);


  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section
        flexDir="column"
        backGroundColor="brand.primary"
        justifyContent="center"
        alignItems="center"
        children={
          <HStack>

            <Heading 
              as='h2'
              color='colors.white'
              w="auto"
              textAlign="center"
            > 
              I&apos;m David Perales
            </Heading>

            <VStack>
              <Heading
                as='h3'
                color='colors.white'
                w="auto"
                textAlign="center"
              >
                ABOUT ME
              </Heading>
            </VStack>

          </HStack>
        }
      />

      <Section
        flexDir="column"
        backGroundColor="brand.secondary"
        justifyContent="center"
        alignItems="center"
        children={
          <>
            <Heading 
              as='h2'
              color='brand.secondary'
              bg='colors.white'
              p=".5rem"
              w="auto"
              textAlign="center"
            > 
              SKILLS
            </Heading>

            <Grid
              templateColumns="repeat(7, 1fr)"
              gap="2rem"
            >
              {
                memorizedSkills.map((skill, index) => (
                  <ModificableCard
                    key={index} 
                    children={
                      <>
                        <Image 
                          src={skill.icon}
                          alt={skill.name}
                          width={50}
                          height={50}
                        />
                        
                        <Text
                          color="colors.gray"
                          fontSize="md"
                          fontWeight="bold"
                        >
                            {skill.name}  
                        </Text>

                      </>
                    } 
                    w={'10rem'} 
                    h={'10rem'} 
                    flexDir={'column'} 
                    backGroundColor={'colors.white'} 
                    justifyContent={'center'} 
                    alignItems={'center'}  
                    borderRadius='25%'                  
                  />
                )
              )
             } 
            </Grid>
          </>
        }
      />

      <Section
        flexDir="column"
        // backGroundColor="colors.white"
        backGroundColor="brand.primary"
        justifyContent="center"
        alignItems="center"
        children={
          <>
            <Heading 
              as='h2'
              color='colors.white'
              // bg='brand.secondary'
              p=".5rem"
              w="auto"
              textAlign="center"
            > 
              { certificatesTitle }
            </Heading>

            <Grid
              templateColumns="repeat(2, 1fr)"
              gap="2rem"
            >
              {
                memorizedCertificates.map((certificate, index) => (
                  <ModificableCard
                    flexDir='row'
                    key={index}
                    w="100%"
                    h="60"
                    borderRadius="1rem"
                    backGroundColor="colors.white"
                    justifyContent="center"
                    alignItems="center"
                    children={
                      <HStack h="100%" w="100%">
                        <Image 
                          src={certificate.certificate.url}
                          alt={certificate.name}
                          width={60}
                          height={60}
                          p="1rem"
                        />
                        <VStack
                          backgroundColor="brand.secondary"
                          p="1rem"
                          color="colors.white"
                          // backgroundColor="colors.white"
                          h="100%"
                          w="100%"
                          // alignItems="center"
                          // justify="center"
                        >
                          <Text
                            fontSize="xl"
                            fontWeight="bold"
                            textAlign="left"
                            // align="center"
                          >
                            {certificate.name}
                          </Text>

                          {/* <Text
                            fontSize="xl"
                            fontWeight="bold"
                          >
                            { transformDate(certificate.date).year }
                          </Text> */}

                          <HStack  >
                            <Tooltip label="Abrir en otra pestaña" aria-label="Abrir en otra pestaña">
                              <ExternalLinkIcon mr=".5rem" cursor="pointer"/>              
                            </Tooltip>
                            

                            <Tooltip label="Descargar" aria-label="Descargar" >
                              <DownloadIcon mr=".5rem"cursor="pointer"/>  
                            </Tooltip>
              
                          </HStack>

                        </VStack>
                      </HStack>
                    }
                   
                  />
                )
              )
             } 
             
            </Grid>
          </>
        }
      />
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