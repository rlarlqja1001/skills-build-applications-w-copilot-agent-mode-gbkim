import { useCallback, useEffect, useState } from 'react';
import { getApiEndpoint, normalizeListPayload } from '../utils/api';
import DataTableCard from './DataTableCard';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const endpoint = getApiEndpoint('workouts');

  const fetchWorkouts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const payload = await response.json();
      setWorkouts(normalizeListPayload(payload));
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'difficulty', label: 'Difficulty' },
    { key: 'target_group', label: 'Target Group' },
    { key: 'suggested_for', label: 'Suggested For' },
  ];

  return (
    <DataTableCard
      title="Workouts"
      description="난이도와 타겟 근육군 기준의 추천 운동 목록입니다."
      endpoint={endpoint}
      rows={workouts}
      columns={columns}
      loading={loading}
      error={error}
      onRefresh={fetchWorkouts}
    />
  );
}

export default Workouts;
