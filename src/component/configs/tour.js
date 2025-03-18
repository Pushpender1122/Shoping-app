import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { homeTourConfig, loginTourConfig, loginHomeTourConfig, adminTourConfig } from '../configs/tourConfig'

export const initializeLoginTour = () => driver(loginTourConfig);
export const initializeLoginHomeTour = () => driver(loginHomeTourConfig);
export const initializeHomeTour = () => driver(homeTourConfig);
export const initializeAdminTour = () => driver(adminTourConfig);