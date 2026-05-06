import { CategoryType } from "@/types/Product.types"

export async function getAllCategories(): Promise<CategoryType[]> {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories",
        {cache: "force-cache"}
    )
    const finalRes = await res.json()
    return finalRes.data

}