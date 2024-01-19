import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

type LinkProps = {
  href: string;
};

// eslint-disable-next-line react/display-name
const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ href, ...other }, ref) => (
  <RouterLink ref={ref} to={href} {...other} />
));

export default Link;
