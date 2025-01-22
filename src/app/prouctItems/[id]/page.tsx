// app/productItems/[id]/page.tsx (Server Component)
import { client } from "@/sanity/lib/client";
import ProductDetails from "@/app/components/ProductDetails";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const query = `*[_type=='product' && id  == "${id}"]{
    "imageUrl": image.asset->url,
    name,
    department,
    originalPrice,
    discountPrice,
    colors,
    id,
    description,
    lDress->{
      description,
      button,
      "heartIconUrl": heartIcon.asset->url,
      "cartIconUrl": cartIcon.asset->url,
      "eyeIconUrl": eyeIcon.asset->url
    }
  }[0]`;

  const product = await client.fetch(query);

  return <ProductDetails product={product} />;
}