import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
  if (window.BACKEND_API_BASE_URL) {
    return window.BACKEND_API_BASE_URL + 'workouts/';
  }
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  return codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = getApiUrl();
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const results = data.results || data;
        setWorkouts(results);
      })
      .catch((err) => {
        console.error('Error fetching workouts:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center my-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;

  return (
    <div className="mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-primary">Workouts</h2>
          {workouts.length === 0 ? (
            <div className="alert alert-info">No workouts found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    {Object.keys(workouts[0]).map((key) => (
                      <th key={key} scope="col">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, idx) => (
                    <tr key={workout.id || idx}>
                      {Object.values(workout).map((val, i) => (
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

export default Workouts;
