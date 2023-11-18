import { Router } from 'express';
import SightingController from '../controllers/sightings.controller.mjs';

class SightingsRouter {
  static path = '/sightings';
  static router = Router();

  controller = new SightingController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes = () => {
    SightingsRouter.router.get(SightingsRouter.path, this.controller.getAllSightings.bind(this.controller));
  };
}

export default SightingsRouter;