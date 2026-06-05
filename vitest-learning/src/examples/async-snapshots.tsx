

/**
 * Simple user card details display for snapshot testing
 */
interface UserCardProps {
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'subscriber';
  status: 'active' | 'suspended';
}

export function UserCard({ name, email, role, status }: UserCardProps) {
  return (
    <div className="p-4 rounded-lg border border-slate-200 bg-white shadow-sm max-w-sm">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-slate-800">{name}</h4>
        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
          status === 'active' 
            ? 'bg-emerald-100 text-emerald-800' 
            : 'bg-rose-100 text-rose-800'
        }`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-slate-500 mb-2">{email}</p>
      <div className="flex gap-2">
        <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-medium capitalize">
          Role: {role}
        </span>
      </div>
    </div>
  );
}
