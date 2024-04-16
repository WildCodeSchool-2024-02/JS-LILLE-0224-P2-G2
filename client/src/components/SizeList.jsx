import "./SizeList.css";
import PropTypes from "prop-types";
import { useState } from "react";

function SizeList({ data, chooseSize, changeSize }) {
  // State qui stock l'état Ouvert/Fermé de la liste des tailles
  const [isOpen, setIsOpen] = useState(false);

  // Fonction qui change l'état de isOpen true/false (Ouvre/Ferme la liste des tailles)
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        type="button"
        className={isOpen ? "choose-size open" : "choose-size"}
        onClick={handleClick}
      >
        {chooseSize}{" "}
        <img src="../assets/images/icons/arrow-bottom.png" alt="" />
      </button>
      {isOpen && (
        <div
          className={isOpen ? "size-list open-list" : "size-list close-list"}
        >
          {data.size.map((size, index) => (
            <>
              <hr />
              <button
                type="button"
                key={size.size}
                className={
                  size.available ? "size-select available" : "size-select"
                }
                disabled={!size.available}
                onClick={() => changeSize(index)}
              >
                <span className="size">{size.size}</span>
                {size.available ? (
                  <span className="available-true">disponible</span>
                ) : (
                  <span className="available-false">indisponible</span>
                )}
              </button>
            </>
          ))}
        </div>
      )}
    </>
  );
}

SizeList.propTypes = {
  data: PropTypes.shape({
    size: PropTypes.arrayOf.isRequired,
    available: PropTypes.bool.isRequired,
  }).isRequired,
  chooseSize: PropTypes.string.isRequired,
  changeSize: PropTypes.func.isRequired,
};
export default SizeList;
