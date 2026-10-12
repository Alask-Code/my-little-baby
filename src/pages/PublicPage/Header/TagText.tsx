import React from 'react';
import { IconType } from 'react-icons';

export default function TagText({ Icon, label, compact }: { Icon: IconType; label: string; compact?: boolean }) {
  return !compact ? (
    <div className="inline-flex items-center gap-2 rounded-full text-rose-400 bg-rose-200 border border-rose-300 px-3 py-2">
      <Icon className="text-orange-400" />
      {label}
    </div>
  ) : (
    <div className="inline-flex text-rose-400 items-center gap-2 rounded-full border border-rose-300 bg-rose-200 px-3 py-1 text-xs font-medium uppercase tracking-wide">
      <Icon />
      {label}
    </div>
  );
}
