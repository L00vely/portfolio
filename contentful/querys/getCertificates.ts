import { contentfulClient } from "..";

interface Certificate {
  name: string;
  certificate: {
    url: string;
  };
  date: string;
  link: string;
  provider: string;
}

interface CertificateCollection {
  items: Certificate[];
}

const getCertificates = async (locale: String): Promise<CertificateCollection | undefined> => {
  const query = `
        query {
            certificateCollection(order: [date_DESC], locale: "${locale}") {
                items {
                  name
                  certificate {
                    url
                  }
                  date
                  link
                  provider
                }
            }
        }
    `;

  try {
    const data = await contentfulClient.request<{ certificateCollection: CertificateCollection }>(query);
    const { certificateCollection } = data;
    return certificateCollection;
  } catch (error) {
    console.error(error);
  }
};

export { getCertificates };
