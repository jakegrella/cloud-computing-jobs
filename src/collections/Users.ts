import { isAdmin, isAdminFieldLevel } from "@/app/(payload)/utils/access/isAdmin";
import { isAdminOrSelf } from "@/app/(payload)/utils/access/isAdminOrSelf";
import { CollectionConfig } from "payload";


const Users: CollectionConfig = {
    slug: 'users',
    auth: true,
    labels: {
        plural: 'Users',
        singular: 'user'
    },
    admin: {
        useAsTitle: 'name',
    },
    access: {
		// Only admins can create users
		create: isAdmin,
		// Admins can read all, but any other logged in user can only read themselves
		read: isAdminOrSelf,
		// Admins can update all, but any other logged in user can only update themselves
		update: isAdminOrSelf,
		// Only admins can delete
		delete: isAdmin,
	},
    fields: [
        {
            name: 'name',
            type: 'text',
            // required: true,
        },
        {
            name: 'roles',
            // Save this field to JWT so we can use from `req.user`
            saveToJWT: true,
            access: {
                // Only admins can create or update a value for this field
				create: isAdminFieldLevel,
				update: isAdminFieldLevel,
            },
            type: 'select',
            hasMany: true,
            options: [
                {
                    label: 'Admin',
                    value: 'admin'
                },
                {
					label: 'Editor',
					value: 'editor',
				},
				{
					label: 'Client',
					value: 'client',
				},
            ],
            defaultValue: ['editor']
        }
    ]
}

export default Users;