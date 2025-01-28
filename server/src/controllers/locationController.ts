import location from "../models/location";

class LocationController {
  static async getLocationDataFromCoordinates(req, res): Promise<void> {
    const { latitude, longitude } = req.params;

    const response = await location.getLocationDataFromCoordinates(
      latitude,
      longitude
    );

    if (response.success) {
      res.send({
        success: response.success,
        forcast: response.forcast,
        latitude: response.latitude,
        longitude: response.longitude,
        name: response.name,
      });

      return;
    }

    res.send({
      success: response.success,
    });
  }

  static async getLocationDataFromName(req, res): Promise<void> {
    const { locationName } = req.params;

    const response = await location.getLocationDataFromName(locationName);

    if (response.success) {
      res.send({
        success: response.success,
        forcast: response.forcast,
        latitude: response.latitude,
        longitude: response.longitude,
        name: response.name,
      });

      return;
    }

    res.send({
      success: response.success,
    });
  }
}

export default LocationController;
