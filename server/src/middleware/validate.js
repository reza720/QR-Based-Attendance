import {z} from "zod";

const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({
                success: false,
                message: "validation failed",
                errors: z.treeifyError(result.error)
            });
        }

        req.body = result.data;
        next();
    }
};

export default validate;