import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "./store/counterSlice";
import { addItem, removeItem } from "./store/shopSlice";
import products from "./mocks/products";
import "./App.css";

function App() {
  const count = useSelector((state) => state.counter.value);
  const { cart, storedProducts, finalPrice } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  return (
    <>
      <h1>Counter</h1>
      <button onClick={() => dispatch(decrement())}>minus</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>plus</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        increment 5
      </button>
      <br />
      <h1>Products</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} id={product.id}>
            <img src={product.image} alt="image" />
            <p>{product.description}</p>
            <p>€{product.price}</p>
            <button onClick={() => dispatch(addItem(product))}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
      {cart.length ? (
        <>
          <h1>Cart</h1>
          <p>Total quantity: {storedProducts}</p>
          <p>Total price: €{finalPrice.toFixed(2)}</p>
          <div className="cart">
            {cart.map((item) => (
              <div key={item.id} id={item.id}>
                <img src={item.image} alt="image" />
                <p>€{item.totalPriceByQuantity.toFixed(2)}</p>
                <p>x {item.quantity}</p>
                <button onClick={() => dispatch(removeItem(item))}>
                  Remove to Cart
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
