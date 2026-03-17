import { useCallback, useEffect, useState } from 'react';
import { getApiEndpoint, normalizeListPayload } from '../utils/api';
import DataTableCard from './DataTableCard';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const endpoint = getApiEndpoint('activities');

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const payload = await response.json();
      setActivities(normalizeListPayload(payload));
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'user', label: 'User' },
    { key: 'activity_type', label: 'Type' },
    { key: 'duration_minutes', label: 'Duration (min)' },
    { key: 'calories_burned', label: 'Calories' },
    { key: 'recorded_at', label: 'Recorded At' },
  ];

  return (
    <DataTableCard
      title="Activities"
      description="운동 활동 기록과 소모 칼로리를 추적합니다."
      endpoint={endpoint}
      rows={activities}
      columns={columns}
      loading={loading}
      error={error}
      onRefresh={fetchActivities}
    />
  );
}

export default Activities;
