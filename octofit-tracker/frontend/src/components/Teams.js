import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
  if (window.BACKEND_API_BASE_URL) {
    return window.BACKEND_API_BASE_URL + 'teams/';
  }
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  return codespace
    ? `https://${codespace}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';
};

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = getApiUrl();
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const results = data.results || data;
        setTeams(results);
      })
      .catch((err) => {
        console.error('Error fetching teams:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center my-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;

  return (
    <div className="mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-primary">Teams</h2>
          {teams.length === 0 ? (
            <div className="alert alert-info">No teams found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    {Object.keys(teams[0]).map((key) => (
                      <th key={key} scope="col">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, idx) => (
                    <tr key={team.id || idx}>
                      {Object.values(team).map((val, i) => (
                        <td key={i}>{typeof val === 'object' ? JSON.stringify(val) : val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
