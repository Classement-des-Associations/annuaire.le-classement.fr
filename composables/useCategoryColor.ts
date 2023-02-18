import { Color } from '@/types'

export const useCategoryColor = (category: Color) => {
  const colors = {
    lime: 'bg-lime-100 text-lime-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    sky: 'bg-sky-100 text-sky-800',
    rose: 'bg-rose-100 text-rose-800',
    teal: 'bg-teal-100 text-teal-800',
    emerald: 'bg-emerald-100 text-emerald-800',
    slate: 'bg-slate-100 text-slate-800',
    orange: 'bg-orange-100 text-orange-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    zinc: 'bg-zinc-100 text-zinc-800',
    fuchsia: 'bg-fuchsia-100 text-fuchsia-800'
  }

  return colors[category]
}
