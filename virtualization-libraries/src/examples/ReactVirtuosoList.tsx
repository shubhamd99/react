import { Virtuoso } from 'react-virtuoso';
import { variableHeightUsers } from '../data';

export function ReactVirtuosoList() {
  return (
    <section className="demo-panel" id="react-virtuoso">
      <div className="demo-header">
        <div>
          <p className="eyebrow">react-virtuoso</p>
          <h2>Large list with automatic row measuring</h2>
        </div>
        <span>{variableHeightUsers.length.toLocaleString()} rows</span>
      </div>

      <div className="virtuoso-box">
        <Virtuoso
          data={variableHeightUsers}
          // Render a little extra content before/after the viewport for smoother scrolling.
          increaseViewportBy={160}
          itemContent={(_, user) => (
            <div className="virtuoso-row" style={{ minHeight: user.height }}>
              <strong>{user.name}</strong>
              <span>{user.notes}</span>
            </div>
          )}
        />
      </div>
    </section>
  );
}
