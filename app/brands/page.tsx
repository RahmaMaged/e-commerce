import { getBrands } from "../_actions/getBrands.action";

export default async function Page() {
  const data = await getBrands();
  const brands = data.data || [];

  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl text-center font-bold text-emerald-600 my-5">
        All Brands
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand: any) => (
          <div
            key={brand._id}
            className="py-3 border rounded-md shadow-sm text-center bg-emerald-100 cursor-pointer"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="mx-auto h-32 object-contain "
            />
            <p className="font-bold text-2xl">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
