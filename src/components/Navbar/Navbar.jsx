import "./Navbar.css";

function Navbar({ activeTab, setActiveTab }) {
  const handleTabClick = (e, tabName) => {
    e.preventDefault();
    setActiveTab(tabName);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={(e) => handleTabClick(e, "home")}>
        <h2>Atman</h2>
      </div>

      <ul className="navbar-links">
        <li>
          <a
            href="#home"
            className={`navbar-link ${activeTab === "home" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "home")}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#cars"
            className={`navbar-link ${activeTab === "cars" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "cars")}
          >
            Cars
          </a>
        </li>
        <li>
          <a
            href="#services"
            className={`navbar-link ${activeTab === "services" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "services")}
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#todo"
            className={`navbar-link ${activeTab === "todo" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "todo")}
          >
            todo
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
