import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from "react-redux";
function AppLayout() {
  const navigation = useNavigation();
  // It provides information about the current navigation state of the application
  // The navigation object contains the state of the navigation process, with key properties like:
  // state: Indicates the current state of the navigation. Common values include:
  // "idle": No navigation is occurring.
  // "loading": A route transition is in progress (e.g., fetching data or loading a new route).
  // "submitting": A form submission is happening during navigation.
  const isLoading = navigation.state === "loading";
  const cart = useSelector((store) => store.cart.cart);
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      {cart.length > 0 && <CartOverview />}
    </div>
  );
}
export default AppLayout;
