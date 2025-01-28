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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const location_1 = __importDefault(require("../models/location"));
class LocationController {
    static getLocationDataFromCoordinates(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { latitude, longitude } = req.params;
            const response = yield location_1.default.getLocationDataFromCoordinates(latitude, longitude);
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
        });
    }
    static getLocationDataFromName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { locationName } = req.params;
            const response = yield location_1.default.getLocationDataFromName(locationName);
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
        });
    }
}
exports.default = LocationController;
