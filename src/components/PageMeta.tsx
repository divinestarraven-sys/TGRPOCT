import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'The Green Resonance Project';
const DEFAULT_DESCRIPTION =
  'A regenerative educational and contemplative living system integrating ecological intelligence, systems thinking, ethical living, symbolic literacy, creative expression, and community resilience.';
const DEFAULT_IMAGE = '/Gallery/03-green-resonance-poster-artwork.jpg';

interface PageMetaProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
}

export default function PageMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  path,
}: PageMetaProps) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      {path && <meta property="og:url" content={`https://www.thegreenresonanceproject.org${path}`} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
