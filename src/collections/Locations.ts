import { isAdmin } from "@/app/(payload)/utils/access/isAdmin";
import type { CollectionConfig } from "payload";

const Locations: CollectionConfig = {
    slug: 'locations',
    access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: 'city',
            type: 'text',
            required: true
        },
        {
            name: 'state',
            type: 'text'
        },
        {
            name: 'country',
            type: 'text',
            required: true
        }

    ]
};

export default Locations;