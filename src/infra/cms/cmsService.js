const API_TOKEN = process.env.DATO_TOKEN;
const DATO_URL = process.env.DATO_URL;
const DATO_URL_PREVIEW = process.env.DATO_URL_PREVIEW;

const globalQuery = `
  {
    globalFooter{
      description
    }
  }
  `;

export async function cmsService({ query, variables, preview }) {
  const url = preview ? DATO_URL_PREVIEW : DATO_URL;

  try {
    const pageContentResponse = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + API_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }).then(async (serverResponse) => {
      const body = await serverResponse.json();
      if (!body.errors) return body;

      throw new Error(JSON.stringify(body));
    });

    const GlobalContentResponse = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + API_TOKEN,
      },
      body: JSON.stringify({
        query: globalQuery,
      }),
    }).then(async (serverResponse) => {
      const body = await serverResponse.json();
      if (!body.errors) return body;

      throw new Error(JSON.stringify(body));
    });

    return {
      data: {
        ...pageContentResponse.data,
        globalContent: {
          ...GlobalContentResponse.data,
        },
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
