import { getCertificates, getProjects } from '@/contentful';
import { useState, useEffect, useMemo } from 'react';

interface Project {
  name: string;
  thumbnail: {
    url: string;
  };
  deployLink?: string;
  githubLink?: string;
}

interface ProjectsHookResult {
    memorizedProjects: Project[]; 
    isLoading: Boolean
}
  
  const useGetProjects = (locale: string): ProjectsHookResult => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    useEffect(() => {
      const fetchSkills = async () => {
        try {
          const fetchedProjects = await getProjects(locale);
          if (fetchedProjects) {
            setProjects(fetchedProjects.items);
            setIsLoading(false)
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchSkills();
    }, [locale]);

  
    const memorizedProjects = useMemo(() => projects, [projects]);
  
    return {
      memorizedProjects,
      isLoading
    };
  };
  
  export default useGetProjects;