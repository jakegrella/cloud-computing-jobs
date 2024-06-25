import { isAdmin } from "@/app/(payload)/utils/access/isAdmin";
import type { CollectionConfig } from "payload";

const Logos: CollectionConfig = {
    slug: 'logos',
    access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },
    upload: {
        staticDir: 'logos',
        mimeTypes: ['image/*'],
        imageSizes: [
            {
                name: 'thumbnail',
                width: 56,
                height: 56,
                position: 'centre'
            }
        ]
    },
    fields: [
        {
            name: 'altText',
            type: 'text'
        }
    ]
};

export default Logos;