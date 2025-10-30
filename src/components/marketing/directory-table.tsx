import { directoryHighlights } from "@/data/content";

export function DirectoryTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
      <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-200">
        <thead className="bg-white/5 text-xs uppercase tracking-[0.3em] text-slate-300/80">
          <tr>
            <th scope="col" className="px-4 py-3">Name</th>
            <th scope="col" className="px-4 py-3">Role</th>
            <th scope="col" className="px-4 py-3">Location</th>
            <th scope="col" className="px-4 py-3">Focus</th>
            <th scope="col" className="px-4 py-3">Availability</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 text-sm">
          {directoryHighlights.map((person) => (
            <tr key={person.name} className="bg-white/0">
              <td className="px-4 py-4 font-medium text-white">{person.name}</td>
              <td className="px-4 py-4 text-slate-200/90">
                <div>{person.title}</div>
                <div className="text-xs text-slate-400/80">{person.company}</div>
              </td>
              <td className="px-4 py-4 text-slate-200/70">{person.location}</td>
              <td className="px-4 py-4 text-slate-200/80">{person.focus}</td>
              <td className="px-4 py-4">
                <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-100/80">
                  {person.availability}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
