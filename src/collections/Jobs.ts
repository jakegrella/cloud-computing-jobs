import { isAdmin } from "@/app/(payload)/utils/access/isAdmin";
import type { CollectionConfig } from "payload";

const Jobs: CollectionConfig = {
    slug: 'jobs',
    access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true
        },
        {
            name: 'company',
            type: 'relationship',
            relationTo: 'companies',
            required: true  
        },
        {
            name: 'externalPostingLink',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'richText',
            required: true
        },
        {
            name: 'status',
            type: 'select',
            options: [
                {
                    label: 'Draft',
                    value: 'draft'
                },
                {
                    label: 'Published',
                    value: 'published'
                }
            ],
            defaultValue: 'draft',
            required: true
        },
        {
            name: 'locations',
            type: 'relationship',
            relationTo: 'locations',
            hasMany: true
        }
    ]
}

export default Jobs;