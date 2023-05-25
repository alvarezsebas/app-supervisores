import { API_HOST } from "../utils/constants";

export async function postDatos(data) {
  try {
    const url = `${API_HOST}/appRevista`;
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {}
}
