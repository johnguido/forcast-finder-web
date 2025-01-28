import axios from "axios";

interface Coordinates {
  latitude: string;
  longitude: string;
}

class DashService {
  private static baseURL: string = "http://localhost:3000";

  static async getLocationDataFromCoordinates(coordinates: Coordinates) {
    try {
      const url = `${this.baseURL}/location/${coordinates.latitude}/${coordinates.longitude}`;

      const response = await axios.get(url);

      if (response.data.success) {
        return {
          success: true,
          forcast: response.data.forcast,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
          name: response.data.name,
        };
      }

      return { success: false };
    } catch (error) {
      console.error("Error grabbing location data from coords: ", error);
      return { success: false };
    }
  }

  static async getLocationDataFromName(locationName: string) {
    try {
      const url = `${this.baseURL}/location/${locationName}`;

      const response = await axios.get(url);

      if (response.data.success) {
        return {
          success: true,
          forcast: response.data.forcast,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
          name: response.data.name,
        };
      }

      return { success: false };
    } catch (error) {
      console.error("Error grabbing location data from coords: ", error);
      return { success: false };
    }
  }
}

export default DashService;
