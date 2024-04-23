import "./Cart.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CartCard from "./CartCard";
import { ShopContext } from "../../context/ShopContext";

function CartContainer({ data }) {
  const { cartItems } = useContext(ShopContext);

  /*  Fonction pour trouver un produit par son ID et le faire correspondre à la data de notre API */
  const findProductById = (productId) => {
    let foundProduct = null;

    // eslint-disable-next-line react/prop-types
    data.some((category) => {
      foundProduct = category.products.find(
        (product) => product.id === productId
      );
      return foundProduct !== undefined; 
    });

    return foundProduct; /* Retourner le produit trouvé ou null s'il n'est pas trouvé */
  };

  const getTotalCartAmount = () => {
    let totalAmount2 = 0;
    let totalAmount;
    Object.keys(cartItems).forEach((itemId) => {
      const product = findProductById(Number(itemId));
      if (product && cartItems[itemId] > 0) {
        totalAmount2 += cartItems[itemId] * product.price;
        totalAmount = `Total ${totalAmount2.toFixed(2)} €`;
      }
    });
    if (totalAmount2 === 0) {
      totalAmount = "Votre panier est vide !";
    }
    return totalAmount;
  };

  return (
    <section className="sectionCart">
      <button type="button" className="buttonCloseDeliveryPayment">
        <img src="./public/assets/images/icons/exit-btn-red.svg" alt="croix" />
      </button>
      <h2>Panier</h2>
      <div className="cardsContainerCart">
        {Object.entries(cartItems).map(([productId, quantity]) => {
          const product = findProductById(parseInt(productId, 10));
          if (product && quantity > 0) {
            return (
              <CartCard key={productId} product={product} quantity={quantity} />
            );
          }
          return null;
        })}
        <span className="totalCart">{getTotalCartAmount()}</span>
        <Link to="/livraison">
          {" "}
          <button type="button" className="cartValidationButton">
            Valider
          </button>
        </Link>
      </div>
    </section>
  );
}

export default CartContainer;

CartContainer.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  some: PropTypes.func.isRequired,
};
