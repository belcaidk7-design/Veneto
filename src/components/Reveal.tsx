import { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  as?: 'div' | 'section' | 'article' | 'li';
}

const Reveal = ({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-700 ease-out',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className,
      )}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
