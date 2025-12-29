import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
  if (window.BACKEND_API_BASE_URL) {
    return window.BACKEND_API_BASE_URL + 'leaderboard/';
  }
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  return codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';
};

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = getApiUrl();
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const results = data.results || data;
        setLeaderboard(results);
      })
      .catch((err) => {
        console.error('Error fetching leaderboard:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center my-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;

  return (
    <div className="mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-primary">Leaderboard</h2>
          {leaderboard.length === 0 ? (
            <div className="alert alert-info">No leaderboard data found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    {Object.keys(leaderboard[0]).map((key) => (
                      <th key={key} scope="col">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, idx) => (
                    <tr key={entry.id || idx}>
                      {Object.values(entry).map((val, i) => (
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

export default Leaderboard;
