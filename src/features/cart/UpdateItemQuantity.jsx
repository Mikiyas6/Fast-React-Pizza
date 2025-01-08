import { useDispatch } from "react-redux";
import Button from "../../UI/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  function handleIncreaseQuantity() {
    dispatch(increaseItemQuantity(pizzaId));
  }
  function handleDecreaseQuantity() {
    dispatch(decreaseItemQuantity(pizzaId));
  }
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={handleDecreaseQuantity}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" onClick={handleIncreaseQuantity}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
