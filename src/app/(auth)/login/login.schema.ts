import * as zod from "zod"


export const loginSchema = zod.object({
    email: zod.string().nonempty("*Please enter your email").email("*Invalid email address"),
    password: zod.string().nonempty("*Please enter your password").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "*Password must be at least 8 characters"),
})

export type LoginDataType = zod.infer<typeof loginSchema>