import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import Loader from "./Loader";
function AppLayout() {
  const navigation = useNavigation();
  // It provides information about the current navigation state of the application
  //   The navigation object contains the state of the navigation process, with key properties like:
  // state: Indicates the current state of the navigation. Common values include:
  // "idle": No navigation is occurring.
  // "loading": A route transition is in progress (e.g., fetching data or loading a new route).
  // "submitting": A form submission is happening during navigation.
  const isLoading = navigation.state === "loading";
  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
export default AppLayout;
