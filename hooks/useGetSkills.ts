import { getSkills } from '@/contentful';
import { useState, useEffect, useMemo } from 'react';

interface Skill{
    name: string;
    // description?: string;
    icon: string;
}

interface SkillsHookResult {
    memorizedSkills: Skill[]; 
    isLoading: boolean
}
  
  const useGetSkills = (locale: string, altLocale: string): SkillsHookResult => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    // Obtenemos las categorías dentro del posts
    useEffect(() => {
      const fetchSkills = async () => {
        try {
          const fetchedSkills = await getSkills();
          if (fetchedSkills) {
            setSkills(fetchedSkills.items);
            setIsLoading(false)
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchSkills();
    }, [locale]);

  
    const memorizedSkills = useMemo(() => skills, [skills]);
  
    return {
      memorizedSkills,
      isLoading
    };
  };
  
  export default useGetSkills;