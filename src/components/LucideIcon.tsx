import { icons } from 'lucide-react';
import type { HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLOrSVGElement> {
  name: keyof typeof icons;
  size?: number;
  color?: string;
}

export default function LucideIcon({ name, size = 16, color = '#3e9392', ...props }: IProps) {
  const SelectedIcon = icons[name];
  return <SelectedIcon size={size} color={color} {...props} />;
}
