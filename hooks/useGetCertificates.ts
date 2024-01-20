import { getCertificates } from '@/contentful';
import { useState, useEffect, useMemo } from 'react';

interface Certificate {
    name: string;
    certificate: {
      url: string;
    };
    date: string;
  }
  
interface SkillsHookResult {
    memorizedCertificates: Certificate[]; 
}
  
  const useGetCertificates = (locale: string): SkillsHookResult => {
    const [certificates, setCertificates] = useState<Certificate[]>([]);

    useEffect(() => {
      const fetchSkills = async () => {
        try {
          const fetchedCertificates = await getCertificates(locale);
          if (fetchedCertificates) {
            setCertificates(fetchedCertificates.items);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchSkills();
    }, [locale]);

  
    const memorizedCertificates = useMemo(() => certificates, [certificates]);
  
    return {
      memorizedCertificates,
    };
  };
  
  export default useGetCertificates;