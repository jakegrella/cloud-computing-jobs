import { User } from "@/payload-types"
import { Access } from "payload"

// export const isAdminOrSelf: Access<any, User> = ({ req: { user } }) => {
export const isAdminOrSelf: Access<User> = ({ req: { user } }) => {
	// Need to be logged in
	if (user) {
		// If user has role of 'admin'
		if (user.roles?.includes('admin')) {
			return true
		}

		// If any other type of user, only provide access to themselves
		return {
			id: {
				equals: user.id,
			},
		}
	}

	// Reject everyone else
	return false
}