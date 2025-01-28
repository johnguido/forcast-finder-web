"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const locationController_1 = __importDefault(require("../controllers/locationController"));
const locationRouter = (0, express_1.default)();
locationRouter.get("/:latitude/:longitude", locationController_1.default.getLocationDataFromCoordinates);
locationRouter.get("/:locationName", locationController_1.default.getLocationDataFromName);
exports.default = locationRouter;
