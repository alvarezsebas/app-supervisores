import { API_HOST } from "../utils/constants";

export async function getAbonados() {
    try {
        const url = `${API_HOST}/abonadoMonitoreo/`
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}