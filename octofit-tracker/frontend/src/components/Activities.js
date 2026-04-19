import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        console.log('Fetching activities from:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched activities data:', data);

        // Handle both paginated and plain array responses
        const activitiesData = data.results || data;
        setActivities(activitiesData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="alert alert-info mt-4">Loading activities...</div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.name}</td>
                <td>{activity.description}</td>
                <td>{activity.activity_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;