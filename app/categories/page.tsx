import { getCategories } from "../_actions/getCategories.action";

export default async function Page() {
  const data = await getCategories();
  const categories = data.data || [];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl text-center font-bold text-emerald-600 my-5">
        All Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="p-4 border rounded-md shadow-sm text-center bg-emerald-100 cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-96 object-cover"
            />
            <p className="font-bold text-2xl mt-5">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
