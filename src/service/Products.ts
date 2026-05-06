import { ProductType } from "@/types/Product.types"

export async function getAllProducts() : Promise<ProductType[]> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products",{
      cache : "force-cache" // stop loading state from showing up when going back when we have already fetched the products data once
    })
    const finalRes = await res.json()
   // console.log("getAllProducts",finalRes.data)
    return finalRes.data
    } catch (error) {
      console.error("Error fetching products:", error)
      return []
    }
  }

export async function getProductById(id : string) : Promise<ProductType | null> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    const finalRes = await res.json()
    console.log("getProductById" , finalRes.data)
    return finalRes.data
    
  } catch (error) {
    console.log("Error fetching product by id:", error)
    return null
  }
}