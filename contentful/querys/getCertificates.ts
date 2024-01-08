import { contentfulClient } from "..";

interface Certificate {
  name: string;
  certificate: {
    url: string;
  };
  date: string;
}

interface CertificateCollection {
  items: Certificate[];
}

const getCertificates = async (locale: String): Promise<CertificateCollection | undefined> => {
  const query = `
        query {
            certificateCollection(locale: "${locale}") {
                items {
                  name
                  certificate {
                    url
                  }
                  date
                }
            }
        }
    `;

  try {
    const data = await contentfulClient.request<{ certificateCollection: CertificateCollection }>(query);
    const { certificateCollection } = data;
    console.log(certificateCollection)
    return certificateCollection;
  } catch (error) {
    console.error(error);
  }
};

export { getCertificates };
