import * as zod from "zod"


export const signupSchema = zod.object({
    name: zod.string().nonempty("*Please enter your name").min(3, "*Name is too short"),
    email: zod.string().nonempty("*Please enter your email").email("*Invalid email address"),
    password: zod.string().nonempty("*Please enter your password").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "*Password must be at least 8 characters"),
    rePassword: zod.string().nonempty("*Please confirm your password").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "*Password must be at least 8 characters"),
    phone: zod.string().nonempty("*Please enter your phone number").regex(/^01[0125][0-9]{8}$/, "*Only Egyptian phone numbers are allowed"),
}).refine(function (data) {
    return data.password === data.rePassword
}, {
    error: "Passwords don't match",
    path: ["rePassword"]
})

export type SignupDataType = zod.infer<typeof signupSchema>