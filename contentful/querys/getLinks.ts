import { contentfulClient } from "..";

interface Link {
  name: string;
  iconLink: string;
  link: string
  tooltip?: string
}

interface LinkCollection {
  items: Link[];
}

const getLinks = async (locale: string): Promise<LinkCollection | undefined> => {
  const query = `
        query {
            linkCollection(locale: "${locale}") {
                items {
                  name
                  iconLink
                  link
                  tooltip 
                }
            }
        }
    `;

  try {
    const data = await contentfulClient.request<{ linkCollection: LinkCollection }>(query);
    const { linkCollection } = data;
    return linkCollection;
  } catch (error) {
    console.error(error);
  }
};

export { getLinks };
