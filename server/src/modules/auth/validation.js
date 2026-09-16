import {z} from "zod";

export const updateUserSchema = z.object({
    oldPassword: z.string().min(4),
    newPassword: z.string().min(4).optional(),
    newUserName: z.string().min(4).optional()
});
