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
}
  
  const useGetLinks = (locale: string): LinksHookResult => {
    const [Links, setLinks] = useState<Link[]>([]);

    useEffect(() => {
      const fetchLinks = async () => {
        try {
          const fetchedLinks = await getLinks(locale);
          if (fetchedLinks) {
            setLinks(fetchedLinks.items);
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
    };
  };
  
  export default useGetLinks;