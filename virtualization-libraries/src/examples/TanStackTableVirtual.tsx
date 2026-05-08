import { useMemo, useRef } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { tablePeople, type Person } from '../data';

export function TanStackTableVirtual() {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      { accessorKey: 'id', header: 'ID', size: 70 },
      { accessorKey: 'name', header: 'Name', size: 180 },
      { accessorKey: 'role', header: 'Role', size: 140 },
      { accessorKey: 'city', header: 'City', size: 140 },
      { accessorKey: 'score', header: 'Score', size: 90 },
      { accessorKey: 'status', header: 'Status', size: 120 },
    ],
    [],
  );

  const table = useReactTable({
    data: tablePeople,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getRowModel().rows;
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 44,
    overscan: 10,
  });

  return (
    <section className="demo-panel wide-panel" id="tanstack-table">
      <div className="demo-header">
        <div>
          <p className="eyebrow">@tanstack/react-virtual + TanStack Table</p>
          <h2>Virtualized table rows</h2>
        </div>
        <span>{rows.length.toLocaleString()} table rows</span>
      </div>

      <div className="table-scroll" ref={tableContainerRef}>
        <table className="data-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} style={{ width: header.getSize() }}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody style={{ height: rowVirtualizer.getTotalSize() }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];

              return (
                <tr
                  key={row.id}
                  className="virtual-table-row"
                  style={{
                    height: virtualRow.size,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
