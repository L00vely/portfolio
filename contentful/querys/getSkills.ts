import { contentfulClient } from "..";

interface Skill {
  name: string;
  icon: string;
}

interface SkillCollection {
  items: Skill[];
}

const getSkills = async (): Promise<SkillCollection | undefined> => {
  const query = `
        query {
            skillCollection {
                items {
                  name
                  icon 
                }
            }
        }
    `;

  try {
    const data = await contentfulClient.request<{ skillCollection: SkillCollection }>(query);
    const { skillCollection } = data;
    return skillCollection;
  } catch (error) {
    console.error(error);
  }
};

export { getSkills };
