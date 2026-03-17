import { useCallback, useEffect, useState } from 'react';
import { getApiEndpoint, normalizeListPayload } from '../utils/api';
import DataTableCard from './DataTableCard';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const endpoint = getApiEndpoint('users');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const payload = await response.json();
      setUsers(normalizeListPayload(payload));
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'hero_name', label: 'Hero' },
    { key: 'team', label: 'Team' },
  ];

  return (
    <DataTableCard
      title="Users"
      description="회원 정보와 소속 팀 상태를 확인합니다."
      endpoint={endpoint}
      rows={users}
      columns={columns}
      loading={loading}
      error={error}
      onRefresh={fetchUsers}
    />
  );
}

export default Users;
