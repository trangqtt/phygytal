import clsx from 'clsx';

interface TypoProps {
  variants?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  component?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: React.ReactNode;
  [key: string]: any;
}

export default function Typo({ variants, component, children, ...others }: TypoProps) {
  let Component: any;
  let cn;

  switch (variants) {
    case 'h1':
      Component = 'h1';
      cn = 'font-bold text-h1';
      break;
    case 'h2':
      Component = 'h2';
      cn = 'font-bold text-h2';
      break;
    case 'h3':
      Component = 'h3';
      cn = 'font-semibold text-h3';
      break;
    case 'h4':
      Component = 'h4';
      cn = 'font-semibold text-h4';
      break;
    case 'h5':
      Component = 'h5';
      cn = 'font-semibold text-h5';
      break;
    case 'h6':
      Component = 'h6';
      cn = 'font-semibold text-h6';
      break;

    default:
      Component = 'div';
  }

  if (component) {
    Component = component;
  }

  return (
    <Component className={clsx('leading-tight', cn)} {...others}>
      {children}
    </Component>
  );
}
