import { get, post } from "@/utils/RequestFactory";

const API_URL = process.env.NEXT_PUBLIC_API;

export async function getUserAccounts(accessToken) {
  try {
    return await get(`${API_URL}/accounts`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAccounts(accessToken) { 
  try {
    return await get(`${API_URL}/accounts/all`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAccountById(id, accessToken) {
  try {
    return await get(`${API_URL}/account/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateRelatedAccounts(data) {
  try {
    const res = await post(`/api/accounts/relate`, data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createAccount(data) {
  try {
    const res = await post(`/api/account`, data, {});
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}