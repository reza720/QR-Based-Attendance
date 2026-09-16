import {mime, z} from "zod";

export const registerationSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, "First can not be empty")
        .max(50, "First name should not exceed characters"),
    lastName: z
        .string()
        .trim()
        .min(1, "Last name is required")
        .max(50, "Last name should not exceed 50 characters")
});

export const updateEmployeeSchema = z.object({
    firstName: z  
        .string()
        .trim()
        .min(1, "First name can not be empty")
        .max(50, "First name should not exceeed 50 characters")
        .optional(),
    lastName: z
        .string()
        .trim()
        .min(1, "Last name can not be empty")
        .max(50, "Last name should not exceed 50 characters")
        .optional(),
    isActove: z
        .boolean()
        .optional()
});
