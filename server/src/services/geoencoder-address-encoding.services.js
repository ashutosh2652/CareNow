import { geocoder } from "../config/geocoder.js";
import { ApiError } from "../utils/ApiError.js";

export default async function (address) {
    if (!address) throw new ApiError(400, "Address is not present!");
    const loc = await geocoder.geocode(address);
    if (!loc || loc.length === 0)
        throw new ApiError(
            400,
            "Couldn't find address, please be more specific!"
        );
    return [loc[0].longitude, loc[0].latitude];
}
