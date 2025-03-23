import React, { useEffect, useState } from 'react';

const UserIdComponent = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserId = async () => {
    try {
      const response = await fetch('https://api.telegram.org/bot8010495012:AAHLKehTCGEHCvxwFLkSW6U8uphsEttL1qo/getUpdates');
      const data = await response.json();
      
      if (data.ok && data.result.length > 0) {
        const userId = data.result[0].message.from.id;
        setUserId(userId);
      } else {
        setError('No updates found or an error occurred.');
      }
    } catch (err) {
      setError('Failed to fetch user ID: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User ID:</h1>
      <p>{userId}</p>
    </div>
  );
};

export default UserIdComponent;
