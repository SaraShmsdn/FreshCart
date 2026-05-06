import * as zod from "zod"

export const checkoutSchema = zod.object({
    details: zod.string().nonempty("Address details must be at least 10 characters").min(10, "Address details must be at least 10 characters"),
    phone: zod.string().nonempty("Please enter a valid Egyptian phone number").regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number"),
    city: zod.string().nonempty("City name must be at least 2 characters").min(2, "City name must be at least 2 characters"),
    postalCode: zod.string().optional(), 
    type: zod.enum(["cash", "online"])
})

export type CheckoutDataType = zod.infer<typeof checkoutSchema>