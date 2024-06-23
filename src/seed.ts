import type { Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
	// Local API methods skip all access control by default
	
    await payload.create({
		collection: 'users',
		data: {
			email: 'test@cloudcomputingjobs.com',
			name: 'jake',
			password: 'test',
			roles: ['admin'],
		},
	})

    await payload.create({
        collection:"companies",
        data: {
            name: 'Cloud Computing Jobs',
        }
    })

    await payload.create({
        collection: 'jobs',
        data: {
            title: 'Software Engineer',
            company: 1,
            externalPostingLink: 'test.com/software-engineer',
            status: 'draft',
            description: {
                root: {
                    type: 'paragraph',
                    children: [
                        {
                            type: 'text',
                            version: 1,
                            text: 'We are looking for a skilled Software Engineer to join our team.', // Example text
                        }
                    ],
                    direction: 'ltr',
                    format: 'left',
                    indent: 0,
                    version: 1
                },
            },
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        }
    })

    await payload.create({
        collection: 'locations',
        data: {
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA'
        }
    })
}