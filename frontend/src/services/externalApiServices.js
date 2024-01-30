import axios from "axios";

export const externalApiServices = { getAccessToken, searchSkills };

async function getAccessToken() {
  const clientId = import.meta.env.VITE_LIGHTCAST_API_CLIENT_ID;
  const secret = import.meta.env.VITE_LIGHTCAST_API_SECRET;
  const scope = import.meta.env.VITE_LIGHTCAST_API_SCOPE;
  try {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", secret);
    params.append("grant_type", "client_credentials");
    params.append("scope", scope);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const response = await axios.post(
      "https://auth.emsicloud.com/connect/token",
      params,
      config
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Failed to fetch access token", error);
  }
}

async function searchSkills(query) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error("Failed to fetch access token");
    return;
  }

  try {
    const response = await axios.get(
      `https://emsiservices.com/skills/versions/latest/skills?q=${query}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to call API", error);
  }
}
