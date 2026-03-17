import { useCallback, useEffect, useState } from 'react';
import { getApiEndpoint, normalizeListPayload } from '../utils/api';
import DataTableCard from './DataTableCard';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const endpoint = getApiEndpoint('teams');

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const payload = await response.json();
      setTeams(normalizeListPayload(payload));
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'city', label: 'City' },
  ];

  return (
    <DataTableCard
      title="Teams"
      description="팀명과 지역 데이터를 동일한 레이아웃으로 보여줍니다."
      endpoint={endpoint}
      rows={teams}
      columns={columns}
      loading={loading}
      error={error}
      onRefresh={fetchTeams}
    />
  );
}

export default Teams;
