import { getSkills } from '@/contentful';
import { useState, useEffect, useMemo } from 'react';

interface Skill{
    name: string;
    // description?: string;
    icon: string;
}

interface SkillsHookResult {
    memorizedSkills: Skill[]; 
}
  
  const useGetSkills = (locale: string, altLocale: string): SkillsHookResult => {
    const [skills, setSkills] = useState<Skill[]>([]);

    // Obtenemos las categorías dentro del posts
    useEffect(() => {
      const fetchSkills = async () => {
        try {
          const fetchedSkills = await getSkills();
          if (fetchedSkills) {
            setSkills(fetchedSkills.items);
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
    };
  };
  
  export default useGetSkills;