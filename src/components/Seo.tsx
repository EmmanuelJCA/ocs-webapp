import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

interface Props {
  title?: string;
  name?: string;
  description?: string;
  image?: string;
  type?: string;
}

const Seo: FC<Props> = (props) => {
  const {
    title = 'OCS',
    name = '',
    description = 'Oncological Control System, la app para el control de tratamientos y pacientes oncológicos',
    image = '/favicon/android-chrome-512x512.png',
    type = 'website',
  } = props;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{`${title} | ${name}`}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Open Graph metadata tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={`${title} | ${name}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter metadata tags */}
      <meta property="twitter:card" content={type} />
      <meta property="twitter:title" content={`${title} | ${name}`} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default Seo;
