import { useMemo, useState } from 'react';

const toDisplayValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return '-';
  }
  return String(value);
};

function DataTableCard({
  title,
  description,
  endpoint,
  rows,
  columns,
  loading,
  error,
  onRefresh,
}) {
  const [filterQuery, setFilterQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredRows = useMemo(() => {
    const query = filterQuery.trim().toLowerCase();
    if (!query) {
      return rows;
    }

    return rows.filter((row) =>
      columns.some((column) => toDisplayValue(row[column.key]).toLowerCase().includes(query))
    );
  }, [rows, columns, filterQuery]);

  return (
    <section className="card shadow-sm border-0 octo-data-card h-100">
      <div className="card-header bg-transparent border-0 pb-0">
        <div className="d-flex flex-column flex-md-row align-items-md-start justify-content-between gap-2">
          <div>
            <h2 className="h5 mb-1">{title}</h2>
            <p className="text-muted small mb-0">{description}</p>
          </div>
          <a
            className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fw-semibold small"
            href={endpoint}
            target="_blank"
            rel="noreferrer"
          >
            API 링크 열기
          </a>
        </div>
      </div>

      <div className="card-body pt-3">
        <form className="row g-2 align-items-end mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-12 col-md">
            <label className="form-label form-label-sm mb-1" htmlFor={`${title}-filter`}>
              {title} 검색
            </label>
            <input
              id={`${title}-filter`}
              type="text"
              className="form-control form-control-sm"
              placeholder="이름, ID, 속성으로 검색"
              value={filterQuery}
              onChange={(event) => setFilterQuery(event.target.value)}
            />
          </div>
          <div className="col-12 col-md-auto">
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-sm btn-primary" onClick={onRefresh}>
                새로고침
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowModal(true)}
              >
                요약 보기
              </button>
            </div>
          </div>
        </form>

        {loading && <div className="alert alert-info py-2 mb-0">데이터를 불러오는 중입니다...</div>}
        {error && (
          <div className="alert alert-danger py-2 mb-0">데이터 로딩 실패: {error}</div>
        )}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle table-sm mb-0 octo-data-table">
              <thead className="table-light">
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} scope="col" className="text-nowrap">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-4 text-muted">
                      표시할 데이터가 없습니다.
                    </td>
                  </tr>
                )}
                {filteredRows.map((row, index) => (
                  <tr key={row.id ?? `${title}-${index}`}>
                    {columns.map((column) => (
                      <td key={`${row.id ?? index}-${column.key}`}>{toDisplayValue(row[column.key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title h6 mb-0">{title} 요약</h3>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body">
                <p className="mb-2">총 항목 수: {rows.length}</p>
                <p className="mb-2">필터링 결과: {filteredRows.length}</p>
                <a
                  className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                  href={endpoint}
                  target="_blank"
                  rel="noreferrer"
                >
                  원본 API 데이터 보기
                </a>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show" onClick={() => setShowModal(false)} />}
    </section>
  );
}

export default DataTableCard;
