"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class location {
    static getLocationDataFromCoordinates(latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${this.locationForcastBaseURL}/${latitude},${longitude}?key=${process.env.WEATHER_API_KEY}`;
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error("Error grabbing location forcast data");
                }
                const locationData = yield response.json();
                const locationName = yield this.getLocationNameFromCoordinates(locationData.latitude, locationData.longitude);
                return {
                    success: true,
                    forcast: locationData,
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                    name: locationName,
                };
            }
            catch (err) {
                console.error("Something went wrong grabbing location data via coords: ", err);
                return {
                    success: false,
                    error: err,
                };
            }
        });
    }
    static getLocationDataFromName(locName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${this.locationForcastBaseURL}/${locName}?key=${process.env.WEATHER_API_KEY}`;
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error("Error grabbing location forcast data");
                }
                const locationData = yield response.json();
                const locationName = yield this.getLocationNameFromCoordinates(locationData.latitude, locationData.longitude);
                return {
                    success: true,
                    forcast: locationData,
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                    name: locationName,
                };
            }
            catch (err) {
                console.error("Something went wrong grabbing location data via name: ", err);
                return {
                    success: false,
                    error: err,
                };
            }
        });
    }
    static getLocationNameFromCoordinates(latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${this.locationNameBaseURL}&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error("Error grabbing location name data");
            }
            const locationName = yield response.json();
            return this.formLocationName(locationName);
        });
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
location.locationForcastBaseURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
location.locationNameBaseURL = "https://nominatim.openstreetmap.org/reverse?format=json";
exports.default = location;
