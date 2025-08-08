import NodeGeocoder from "node-geocoder";
import { config } from "./env";

const options = {
    provider: config.GEOCODER_PROVIDER,
    formatter: null,
};

export const geocoder = NodeGeocoder(options);
