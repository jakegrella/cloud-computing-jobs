import { isAdmin } from "@/app/(payload)/utils/access/isAdmin";
import type { CollectionConfig } from "payload";

const Companies: CollectionConfig = {
    slug: 'companies',
    access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'logos',
        },
        {
            name: 'description',
            type: 'richText'
        }
    ]
};

export default Companies;