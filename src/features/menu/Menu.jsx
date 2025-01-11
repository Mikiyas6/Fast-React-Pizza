import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
function Menu() {
  const menu = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
/*
- Loaders are asynchronous functions that are executed when a route is matched during navigation or page load and fetches data and returns it to the route all before rendering a component. They ensure the required data is available when the component is displayed, providing a smooth user experience. 
 - Loaders Basically fetch and prepare the data needed for a route. This data is passed to the corresponding component via the useLoaderData hook
 - If a loader encounters an error (e.g., a failed API call), React Router automatically handles it by rendering the errorElement for that route

-- So in general, When a user navigates to a route with a loader, React Router executes the loader function before rendering the component. The data fetched by the loader is then passed to the component via useLoaderData. And if there occurs an error while fetching, then React Router will automatically handles it by rendering the errorElement for that route. And since Loaders only fetch data for the route currently being navigated to, reducing unnecessary network requests and improving app performance.

*/
export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
