class location {
  static locationForcastBaseURL: string =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

  static locationNameBaseURL: string =
    "https://nominatim.openstreetmap.org/reverse?format=json";

  static async getLocationDataFromCoordinates(
    latitude: string,
    longitude: string
  ) {
    try {
      let url = `${this.locationForcastBaseURL}/${latitude},${longitude}?key=${process.env.WEATHER_API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error grabbing location forcast data");
      }

      const locationData = await response.json();

      const locationName = await this.getLocationNameFromCoordinates(
        locationData.latitude,
        locationData.longitude
      );

      return {
        success: true,
        forcast: locationData,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        name: locationName,
      };
    } catch (err) {
      console.error(
        "Something went wrong grabbing location data via coords: ",
        err
      );

      return {
        success: false,
        error: err,
      };
    }
  }

  static async getLocationDataFromName(locName: string) {
    try {
      let url = `${this.locationForcastBaseURL}/${locName}?key=${process.env.WEATHER_API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error grabbing location forcast data");
      }

      const locationData = await response.json();

      const locationName = await this.getLocationNameFromCoordinates(
        locationData.latitude,
        locationData.longitude
      );

      return {
        success: true,
        forcast: locationData,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        name: locationName,
      };
    } catch (err) {
      console.error(
        "Something went wrong grabbing location data via name: ",
        err
      );

      return {
        success: false,
        error: err,
      };
    }
  }

  static async getLocationNameFromCoordinates(
    latitude: string,
    longitude: string
  ) {
    let url = `${this.locationNameBaseURL}&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error grabbing location name data");
    }

    const locationName = await response.json();

    return this.formLocationName(locationName);
  }

  static formLocationName(locationData) {
    if (locationData.address.city != null) {
      return locationData.address.city + ", " + locationData.address.state;
    }

    if (locationData.address.county != null) {
      return locationData.address.county + ", " + locationData.address.state;
    }

    if (locationData.address.country != null) {
      return locationData.address.country;
    }
    return locationData.address.state;
  }
}

export default location;
