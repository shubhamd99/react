// react
import { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'

// feature
import cn from 'classnames'

function Table({ className, children, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-surface-border">
      <table className={cn('w-full text-sm text-left', className)} {...props}>
        {children}
      </table>
    </div>
  )
}

function Head({ className, children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn('bg-surface-raised text-xs font-semibold uppercase tracking-wide text-muted', className)} {...props}>
      {children}
    </thead>
  )
}

function Body({ className, children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn('divide-y divide-surface-border bg-surface-base', className)} {...props}>
      {children}
    </tbody>
  )
}

function Row({ className, children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn('transition-colors hover:bg-surface-raised', className)} {...props}>
      {children}
    </tr>
  )
}

function Th({ className, children, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={cn('px-4 py-3', className)} {...props}>
      {children}
    </th>
  )
}

function Td({ className, children, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn('px-4 py-3 text-primary', className)} {...props}>
      {children}
    </td>
  )
}

Table.Head = Head
Table.Body = Body
Table.Row  = Row
Table.Th   = Th
Table.Td   = Td

export { Table }
