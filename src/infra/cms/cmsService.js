const API_TOKEN = process.env.API_TOKEN;

export async function cmsService({ query }) {
  try {
    const pageContentResponse = await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + API_TOKEN,
      },
      body: JSON.stringify({
        query,
      }),
    }).then(async (serverResponse) => {
      const body = await serverResponse.json();
      if (!body.errors) return body;

      throw new Error(JSON.stringify(body));
    });

    return {
      data: pageContentResponse.data,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
