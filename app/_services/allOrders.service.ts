export async function getAllCategories(): Promise<OrderType[] | null> {
  try {
    let res = await fetch("https://ecommerce.routemisr.com/api/v1/orders/");

    let resData = await res.json();

    console.log(resData.data);

    return resData.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
