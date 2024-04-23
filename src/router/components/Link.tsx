import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

type LinkProps = {
  href: string;
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ href, ...other }, ref) => (
  <RouterLink ref={ref} to={href} {...other} />
));

Link.displayName = 'Link';

export { Link };
