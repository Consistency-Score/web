import { Link } from "react-router-dom";

import { CheckoutPage } from "../Checkout";

const ProductListingsPage = () => {
  return (
    <div className="App">
      <Link to="/checkout">Book a Single Meeting with Advisor 1</Link>
      <br />
      <Link to="/checkout">Book a Monthly Subscription to Advisor 2</Link>
    {/* <CheckoutPage/> */}
    </div>
  );
};

export default ProductListingsPage;
