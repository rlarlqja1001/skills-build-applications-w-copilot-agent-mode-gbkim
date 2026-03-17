import { useCallback, useEffect, useState } from 'react';
import { getApiEndpoint, normalizeListPayload } from '../utils/api';
import DataTableCard from './DataTableCard';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const endpoint = getApiEndpoint('leaderboard');

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const payload = await response.json();
      setEntries(normalizeListPayload(payload));
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'user', label: 'User' },
    { key: 'total_points', label: 'Total Points' },
    { key: 'rank', label: 'Rank' },
  ];

  return (
    <DataTableCard
      title="Leaderboard"
      description="사용자별 누적 포인트와 순위를 확인합니다."
      endpoint={endpoint}
      rows={entries}
      columns={columns}
      loading={loading}
      error={error}
      onRefresh={fetchLeaderboard}
    />
  );
}

export default Leaderboard;
