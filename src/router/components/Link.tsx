import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

type Props = {
  href: string;
};

const Link = forwardRef<HTMLAnchorElement, Props>(({ href, ...other }, ref) => (
  <RouterLink ref={ref} to={href} {...other} />
));

Link.displayName = 'Link';

export { Link };
