import { getLinks } from '@/contentful';
import { useState, useEffect, useMemo } from 'react';

interface Link{
    name: string;
    link: string;
    iconLink: string;
    tooltip?: string
}

interface LinksHookResult {
    memorizedLinks: Link[]; 
    isLoading: boolean
}
  
  const useGetLinks = (locale: string): LinksHookResult => {
    const [Links, setLinks] = useState<Link[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchLinks = async () => {
        try {
          const fetchedLinks = await getLinks(locale);
          if (fetchedLinks) {
            setLinks(fetchedLinks.items);
            setIsLoading(false);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchLinks();
    }, [locale]);

  
    const memorizedLinks = useMemo(() => Links, [Links]);
  
    return {
      memorizedLinks,
      isLoading
    };
  };
  
  export default useGetLinks;