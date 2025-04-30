import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1 className="my-4">Welcome to the Fake Store</h1>
      <p>Your one-stop shop for all things fake!</p>
      <Link to="/products" className="btn btn-primary mt-3">
        View Products</Link>
    </div>
  );
}

export default Home;