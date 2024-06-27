import type { Location } from "@/payload-types";

export function locationsRender(locations: Location[]) {
    let statement = `${locations[0].city}, ${locations[0].state}`;
    if (locations.length > 1) statement += ` +${locations.length - 1}`;
    return statement;
};
