import Router from "express";
import LocationController from "../controllers/locationController";

const locationRouter = Router();

locationRouter.get(
  "/:latitude/:longitude",
  LocationController.getLocationDataFromCoordinates
);

locationRouter.get(
  "/:locationName",
  LocationController.getLocationDataFromName
);

export default locationRouter;
