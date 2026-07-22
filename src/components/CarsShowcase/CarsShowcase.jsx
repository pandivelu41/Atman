import { useState, useEffect } from "react";
import { fetchCars } from "../../services/api";
import "./CarsShowcase.css";

function CarsShowcase() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCars();
      setCars(data);
    } catch (err) {
      setError("Failed to fetch car catalog. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="status-container">
        <div className="spinner"></div>
        <p>Loading luxury fleet catalog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-container error">
        <p className="error-message">{error}</p>
        <button className="btn-retry" onClick={loadData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="cars-container">
      <div className="section-header">
        <h2>Luxury Fleet</h2>
        <span className="count-badge">{cars.length} Models Available</span>
      </div>

      <div className="cars-grid">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-image-wrapper">
              <img src={car.image} alt={car.name} className="car-image" />
              <span className="car-category">{car.category}</span>
            </div>
            <div className="car-details">
              <h3 className="car-name">{car.name}</h3>
              
              <div className="car-specs">
                <div className="spec-item">
                  <span className="spec-label">Power</span>
                  <span className="spec-value">{car.horsepower}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Speed</span>
                  <span className="spec-value">{car.acceleration}</span>
                </div>
              </div>

              <div className="car-footer">
                <div>
                  <span className="price-label">Starting at</span>
                  <div className="car-price">{car.price}</div>
                </div>
                <button className="btn-details">Configure</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarsShowcase;
