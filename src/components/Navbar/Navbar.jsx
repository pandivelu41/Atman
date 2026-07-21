import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Atman</h2>
      </div>

      <ul className="navbar-links">
        <li><a href="#home" className="navbar-link active">Home</a></li>
        <li><a href="#cars" className="navbar-link">Cars</a></li>
        <li><a href="#services" className="navbar-link">Services</a></li>
        <li><a href="#about" className="navbar-link">About</a></li>
        <li><a href="#contact" className="navbar-link">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
