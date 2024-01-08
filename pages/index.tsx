/* eslint-disable react/no-children-prop */
import Head from 'next/head'
import { Card, Flex, Heading, Text, Image, Grid, HStack, Box, VStack, ScaleFade, useDisclosure, Button, Tooltip, Collapse, Divider } from '@chakra-ui/react'
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

      {/* SKILLS SECTION */}
      <Section
        flexDir="column"
        backGroundColor="brand.primary"
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
              templateColumns="repeat(auto-fill, minmax(8rem, 1fr))"
              gap="2rem"
              w="100%"
              justifyContent="center"
              gridAutoRows="10rem"
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
                    w="100%" 
                    h="100%" 
                    flexDir={'column'} 
                    backGroundColor={'colors.white'} 
                    justifyContent={'center'} 
                    alignItems={'center'}  
                    borderRadius='10%'                  
                  />
                )
              )
             } 
            </Grid>
          </>
        }
      />

      {/* CERTIFICATES SECTION */}
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
              templateColumns="repeat(auto-fill, minmax(15rem, 1fr))"
              gap="2rem"
              w="100%"
              justifyContent="center"
              gridAutoRows="fit-content"
            >
              {
                memorizedCertificates.map((certificate, index) => (
                  <ModificableCard
                    key={index} 
                    children={
                      <>
                        <Image 
                          src={ certificate.certificate.url }
                          alt={ certificate.name }
                          width="10rem"
                          height="auto"
                        />
                        
                        <Divider />

                        <HStack>
                          <CalendarIcon />
                        </HStack>

                        <Text
                          color="colors.gray"
                          fontSize="md"
                          fontWeight="bold"
                        >
                            { certificate.name }  
                        </Text>

                      </>
                     
                    } 

                    padding='1rem'
                    w="100%" 
                    h="100%" 
                    flexDir={'column'} 
                    backGroundColor={'colors.white'} 
                    justifyContent={'center'} 
                    alignItems={'center'}  
                    borderRadius='5%'                  
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