import { useState, useEffect } from "react";
import { fetchUsers } from "../../services/api";
import "./UserProfiles.css";

function UserProfiles() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError("Failed to fetch user profiles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  if (loading) {
    return (
      <div className="status-container">
        <div className="spinner"></div>
        <p>Retrieving user profiles database...</p>
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
    <div className="users-container">
      <div className="section-header-users">
        <div className="section-header-text">
          <h2>Our Partners & Team</h2>
          <p className="section-description">Members and contributors retrieved from live JSONPlaceholder API.</p>
        </div>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="no-results">
          <p>No members found matching "{searchTerm}"</p>
        </div>
      ) : (
        <div className="users-grid">
          {filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-card-header">
                <img
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
                  alt={user.name}
                  className="user-avatar"
                />
                <div>
                  <h3 className="user-name-title">{user.name}</h3>
                  <span className="user-username">@{user.username}</span>
                </div>
              </div>
              <div className="user-card-body">
                <div className="info-row">
                  <span className="info-icon">✉</span>
                  <a href={`mailto:${user.email}`} className="info-value email-link">{user.email}</a>
                </div>
                <div className="info-row">
                  <span className="info-icon">🌐</span>
                  <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="info-value web-link">
                    {user.website}
                  </a>
                </div>
                <div className="info-row">
                  <span className="info-icon">💼</span>
                  <span className="info-value">{user.company.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📍</span>
                  <span className="info-value">{user.address.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProfiles;
