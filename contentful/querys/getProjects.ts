import { contentfulClient } from "..";

interface Project {
  name: string;
  thumbnail: {
    url: string;
  };
  deployLink?: string;
  githubLink?: string;
  description: string;
  technologies: string[];
}


interface ProjectCollection {
  items: Project[];
}

const getProjects = async (locale: String): Promise<ProjectCollection | undefined> => {
  const query = `
        query {
            projectCollection(order: [name_DESC], locale: "${locale}") {
                items {
                  name
                  thumbnail {
                    url
                  }
                  deployLink
                  githubLink
                  description
                  technologies
                }
            }
        }
    `;

  try {
    const data = await contentfulClient.request<{ projectCollection: ProjectCollection }>(query);
    const { projectCollection } = data;
    return projectCollection;
  } catch (error) {
    console.error(error);
  }
};

export { getProjects };
