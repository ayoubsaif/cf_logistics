import { get } from "@/utils/RequestFactory";

const API_URL = process.env.NEXT_PUBLIC_API;

export async function getSiteConfig() {
  try {
    return await get(`${API_URL}/api/siteconfig`, {});
  } catch (error) {
    console.error(error);
  }
}

export async function updateSiteConfig(data, accessToken) {
  try {
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    return await RequestFactory.post(
      `${API_URL}/api/siteconfig`,
      data,
      options
    );
  } catch (error) {
    throw new Error("Failed to update data");
  }
}
