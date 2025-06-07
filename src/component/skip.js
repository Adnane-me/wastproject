import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SkipSelector.css";
import { FaRoad, FaTrash } from "react-icons/fa";
import NAVBAR from "./navbar";
import { useIsMobile } from "./hooks/useIsMobile";

const SkipSelector = () => {
  const [skips, setSkips] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [modalSkip, setModalSkip] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const response = await axios.get(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        setSkips(response.data);
      } catch (error) {
        console.error("Erreur API:", error);
      }
    };

    fetchSkips();
  }, []);

  const handleCardClick = (skip) => {
    setSelectedId(skip.id);
    setModalSkip(skip);
  };

  const handleCloseModal = () => {
    setModalSkip(null);
  };

  return (
    <>
      <NAVBAR />
      <center>
        <h1>{isMobile ? "Choose Skip (Mobile)" : "Choose Your Skip Size"}</h1>
      </center>

      <div className="skip-container">
        {skips.map((skip) => {
          const totalPrice = (skip.price_before_vat * (1 + skip.vat / 100)).toFixed(2);
          const vatAmount = (skip.price_before_vat * (skip.vat / 100)).toFixed(2);

          return (
            <div
              key={skip.id}
              className={`skip-card ${selectedId === skip.id ? "selected" : ""}`}
              onClick={() => handleCardClick(skip)}
            >
              <div className="skip-header">
                <h3>{skip.size} Yard Skip</h3>
                <span className="badge">{skip.hire_period_days} days hire</span>
              </div>

              <div className="skip-body">
                <p><strong>Price (HT):</strong> £{skip.price_before_vat}</p>
                <p><strong>VAT ({skip.vat}%):</strong> £{vatAmount}</p>
                <p><strong>Total (TTC):</strong> £{totalPrice}</p>

                <div className="features">
                  <span className={skip.allowed_on_road ? "feature on" : "feature off"}>
                    <FaRoad /> On Road: {skip.allowed_on_road ? "Yes" : "No"}
                  </span>
                  <span className={skip.allows_heavy_waste ? "feature on" : "feature off"}>
                    <FaTrash /> Heavy Waste: {skip.allows_heavy_waste ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              <div className="skip-footer">
                <button className={selectedId === skip.id ? "selected-btn" : ""}>
                  {selectedId === skip.id ? "Selected" : "Select This Skip"}
                </button>
              </div>
            </div>
          );
        })}

        {modalSkip && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{modalSkip.size} Yard Skip Summary</h2>
              <p>
                <strong>Total Price:</strong> £
                {(modalSkip.price_before_vat * (1 + modalSkip.vat / 100)).toFixed(2)}
              </p>
              <div className="modal-buttons">
                <button onClick={handleCloseModal}>Back</button>
                <button onClick={() => alert("Returned!")}>Return</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SkipSelector;
