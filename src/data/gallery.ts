export interface GalleryImage {
  src: string;
  srcOptimized?: string;
  srcWebp?: string;
  width?: number;
  height?: number;
  alt: string;
  title: string;
  category: GalleryCategory;
  description: string;
}

export type GalleryCategory =
  | 'framework'
  | 'pillars'
  | 'phoenix'
  | 'keys'
  | 'garden'
  | 'resources'
  | 'ravenstar'
  | 'codex'
  | 'portals';

// Public assets live in /public/Gallery.
// Keep the capital G consistent: Linux/Bolt hosting is case-sensitive.
export const GALLERY_BASE_PATH = '/Gallery';
const OPT = `${GALLERY_BASE_PATH}/optimized`;

/**
 * HOW TO ADD A FUTURE IMAGE:
 * 1. Convert the image to optimized JPG (or JPEG).
 * 2. Put it in public/Gallery/.
 * 3. Use a lowercase, hyphenated filename (e.g. 15-new-artwork-title.jpg).
 * 4. Add one GalleryImage object below with src, alt, title, category, description.
 * 5. Choose an existing GalleryCategory or add a new one to the type above.
 * 6. Run `npm run typecheck` and `npm run build` to confirm.
 */
export const galleryImages: GalleryImage[] = [
  {
    src: `${GALLERY_BASE_PATH}/01-best-new-garden-map.jpg`,
    srcOptimized: `${OPT}/01-best-new-garden-map.jpg`,
    srcWebp: `${OPT}/01-best-new-garden-map.webp`,
    width: 1200, height: 675,
    alt: 'Best New Resonance Garden Map — complete bioregional layout of the living garden system',
    title: 'Resonance Garden — Best New Map',
    category: 'garden',
    description: 'The latest complete Resonance Garden bioregional layout for the Green Resonance Project.',
  },
  {
    src: `${GALLERY_BASE_PATH}/02-new-green-resonance-garden-map-delta.jpg`,
    srcOptimized: `${OPT}/02-new-green-resonance-garden-map-delta.jpg`,
    srcWebp: `${OPT}/02-new-green-resonance-garden-map-delta.webp`,
    width: 1200, height: 675,
    alt: 'Green Resonance Garden Map Delta — updated map showing ecological zones and portal connections',
    title: 'Green Resonance Garden Map — Delta',
    category: 'garden',
    description: 'Delta edition of the Green Resonance Garden Master Map showing updated portal connections and systems.',
  },
  {
    src: `${GALLERY_BASE_PATH}/03-green-resonance-poster-artwork.jpg`,
    srcOptimized: `${OPT}/03-green-resonance-poster-artwork.jpg`,
    srcWebp: `${OPT}/03-green-resonance-poster-artwork.webp`,
    width: 1200, height: 675,
    alt: 'Green Resonance Project poster artwork for the living framework',
    title: 'Green Resonance — Poster Artwork',
    category: 'framework',
    description: 'Poster-ready artwork representing the Green Resonance living framework.',
  },
  {
    src: `${GALLERY_BASE_PATH}/04-six-pillars-latest-update.jpg`,
    srcOptimized: `${OPT}/04-six-pillars-latest-update.jpg`,
    srcWebp: `${OPT}/04-six-pillars-latest-update.webp`,
    width: 800, height: 1200,
    alt: 'Six Pillars of the Green Resonance Framework — latest update showing all six foundational pillars',
    title: 'Six Pillars — Latest Update',
    category: 'pillars',
    description: 'Latest Six Pillars diagram showing the core pillar relationships and practice structure.',
  },
  {
    src: `${GALLERY_BASE_PATH}/05-six-pillars-rhythmic-weave-edition.jpg`,
    srcOptimized: `${OPT}/05-six-pillars-rhythmic-weave-edition.jpg`,
    srcWebp: `${OPT}/05-six-pillars-rhythmic-weave-edition.webp`,
    width: 800, height: 1200,
    alt: 'Six Pillars Rhythmic Weave Edition — connective thread woven through all six pillars',
    title: 'Six Pillars — Rhythmic Weave Edition',
    category: 'pillars',
    description: 'Rhythmic Weave edition emphasising resonance, reciprocity, rhythm, reflection, reverence, and remembrance.',
  },
  {
    src: `${GALLERY_BASE_PATH}/06-green-resonance-framework-six-pillars-maxres.jpg`,
    srcOptimized: `${OPT}/06-green-resonance-framework-six-pillars-maxres.jpg`,
    srcWebp: `${OPT}/06-green-resonance-framework-six-pillars-maxres.webp`,
    width: 800, height: 1200,
    alt: 'The Green Resonance Framework Six Pillars — maximum resolution complete overview of the integrated system',
    title: 'The Green Resonance Framework — Six Pillars MaxRes',
    category: 'framework',
    description: 'Maximum resolution overview of the complete Green Resonance Framework six-pillar system.',
  },
  {
    src: `${GALLERY_BASE_PATH}/07-keys-to-the-kingdom-keys.jpg`,
    srcOptimized: `${OPT}/07-keys-to-the-kingdom-keys.jpg`,
    srcWebp: `${OPT}/07-keys-to-the-kingdom-keys.webp`,
    width: 849, height: 1200,
    alt: 'Keys to The Kingdom symbolic keys representing portal gates and transformation stages',
    title: 'Keys to The Kingdom — The Keys',
    category: 'keys',
    description: 'Symbolic keys representing the portal gates and transformation stages of the Green Resonance journey.',
  },
  {
    src: `${GALLERY_BASE_PATH}/08-keys-to-the-kingdom-master-map.jpg`,
    srcOptimized: `${OPT}/08-keys-to-the-kingdom-master-map.jpg`,
    srcWebp: `${OPT}/08-keys-to-the-kingdom-master-map.webp`,
    width: 800, height: 1200,
    alt: 'Keys to The Kingdom Master Map — complete map of portals, pathways and interconnections',
    title: 'Keys to The Kingdom — Master Map',
    category: 'keys',
    description: 'The complete master key map showing portals, pathways, symbols, and their interconnections.',
  },
  {
    src: `${GALLERY_BASE_PATH}/09-phoenix-master-sigil.jpg`,
    srcOptimized: `${OPT}/09-phoenix-master-sigil.jpg`,
    srcWebp: `${OPT}/09-phoenix-master-sigil.webp`,
    width: 1200, height: 1200,
    alt: 'The Phoenix Master Sigil — sacred symbol of transformation, rebirth, and rising from ashes',
    title: 'The Phoenix Master Sigil',
    category: 'phoenix',
    description: 'The sacred sigil of the Phoenix Principle: burn what is false, protect what is true, rise in alignment.',
  },
  {
    src: `${GALLERY_BASE_PATH}/10-green-resonance-workbook-cover.jpg`,
    srcOptimized: `${OPT}/10-green-resonance-workbook-cover.jpg`,
    srcWebp: `${OPT}/10-green-resonance-workbook-cover.webp`,
    width: 849, height: 1200,
    alt: 'The Green Resonance Workbook cover artwork for the complete practice workbook',
    title: 'The Green Resonance Workbook Cover',
    category: 'resources',
    description: 'Cover artwork for the Green Resonance workbook and practice journey.',
  },
  {
    src: `${GALLERY_BASE_PATH}/11-keys-to-the-kingdom-delta-master-map.jpg`,
    srcOptimized: `${OPT}/11-keys-to-the-kingdom-delta-master-map.jpg`,
    srcWebp: `${OPT}/11-keys-to-the-kingdom-delta-master-map.webp`,
    width: 800, height: 1200,
    alt: 'Keys to The Kingdom Delta Master Key Map integrating six keys, seven portals, and the Garden system',
    title: 'Keys to The Kingdom — Delta Garden Integration',
    category: 'keys',
    description: 'A detailed master key map integrating six keys, seven portals, harmonic correspondences, and Garden infrastructure.',
  },
  {
    src: `${GALLERY_BASE_PATH}/12-keys-to-the-kingdom-symbolic-map.jpg`,
    srcOptimized: `${OPT}/12-keys-to-the-kingdom-symbolic-map.jpg`,
    srcWebp: `${OPT}/12-keys-to-the-kingdom-symbolic-map.webp`,
    width: 849, height: 1200,
    alt: 'Keys to The Kingdom symbolic map showing six master keys, terrain, ethics, and associated symbols',
    title: 'Keys to The Kingdom — Symbolic Map',
    category: 'keys',
    description: 'A symbolic map of the six master keys, safety ethics, topography, apothecary guilds, and sacred geometry.',
  },
  {
    src: `${GALLERY_BASE_PATH}/13-six-pillars-daily-practice-cards.jpg`,
    srcOptimized: `${OPT}/13-six-pillars-daily-practice-cards.jpg`,
    srcWebp: `${OPT}/13-six-pillars-daily-practice-cards.webp`,
    width: 800, height: 1200,
    alt: 'Green Resonance Framework daily practice cards showing six pillars and six portal keys',
    title: 'Six Pillars — Daily Practice Cards',
    category: 'pillars',
    description: 'A complete daily practice card spread for the six pillars, six portal keys, and Rhythmic Weave principles.',
  },
  {
    src: `${GALLERY_BASE_PATH}/14-six-pillars-portal-keys-expanded.jpg`,
    srcOptimized: `${OPT}/14-six-pillars-portal-keys-expanded.jpg`,
    srcWebp: `${OPT}/14-six-pillars-portal-keys-expanded.webp`,
    width: 800, height: 1200,
    alt: 'Expanded Green Resonance daily practice cards with six portal keys and sigils',
    title: 'Six Pillars — Portal Keys Expanded',
    category: 'pillars',
    description: 'Expanded six-pillar card system with portal key sigils, affirmations, action steps, and living integration.',
  },
  {
    src: '/images/garden/Green_Resonance_Master_Map_3_0_Delta.jpg',
    alt: 'Green Resonance Master Map 3.0 Delta — complete bioregional garden layout with all seven portals',
    title: 'Green Resonance Master Map 3.0 Delta',
    category: 'garden',
    description: 'The comprehensive master map showing the full bioregional garden layout with all seven portals and Central Heart.',
  },
  {
    src: '/images/garden/Portal_1_North_Awareness_Silver_Grove.jpg',
    alt: 'Portal 1 — North Portal of Awareness, The Silver Grove',
    title: 'Portal 1 — The Silver Grove',
    category: 'portals',
    description: 'North Portal of Awareness: food forest, meditation groves, herb garden, and Ravenstar Moon Observatory.',
  },
  {
    src: '/images/garden/Portal_2_Ethics_Hearth_of_Integrity.jpg',
    alt: 'Portal 2 — Portal of Ethics, The Hearth of Integrity',
    title: 'Portal 2 — The Hearth of Integrity',
    category: 'portals',
    description: 'Portal of Ethics: eco-housing cluster, community kitchen, council circle, and shared food systems.',
  },
  {
    src: '/images/garden/Portal_3_East_Earth_Manifestation_Grounds.jpg',
    alt: 'Portal 3 — East Portal of Earth, The Manifestation Grounds',
    title: 'Portal 3 — The Manifestation Grounds',
    category: 'portals',
    description: 'East Portal of Earth: working farm, regenerative plots, orchards, composting, and earth-connected practice.',
  },
  {
    src: '/images/garden/Portal_4_South_Flow_Pattern_Trails.jpg',
    alt: 'Portal 4 — South Portal of Flow, Pattern Trails',
    title: 'Portal 4 — Pattern Trails',
    category: 'portals',
    description: 'South Portal of Flow: walking trails, observation points, water features, and systems-thinking landscape.',
  },
  {
    src: '/images/garden/Portal_5D_Astral_Rhythmic_Weave.jpg',
    alt: 'Portal 5D — Astral Portal, The Rhythmic Weave',
    title: 'Portal 5D — The Rhythmic Weave',
    category: 'portals',
    description: 'Astral Portal: Musement Stage, dancefloor, ecstatic dance, ceremony circle, and collective resonance.',
  },
  {
    src: '/images/garden/Portal_6_West_Ethereal_Muse_Play_Space.jpg',
    alt: 'Portal 6 — West Ethereal Muse Portal, The Play-Space',
    title: 'Portal 6 — The Play-Space',
    category: 'portals',
    description: 'West Ethereal Muse Portal: art studios, sound garden, play gardens, amphitheatre, and creative expression.',
  },
  {
    src: '/images/garden/Portal_7_Central_Heart_Resonance_Circle.jpg',
    alt: 'Portal 7 — Central Heart Portal, The Resonance Circle',
    title: 'Portal 7 — The Resonance Circle',
    category: 'portals',
    description: 'Central Heart Portal: Oak Tree of Life, Celtic labyrinth, sacred fire space, and meditation amphitheatre.',
  },
];

export const categoryLabels: Record<'All' | GalleryCategory, string> = {
  All: 'All',
  framework: 'Framework',
  pillars: 'Pillars',
  phoenix: 'Phoenix',
  keys: 'Keys',
  garden: 'Garden',
  portals: 'Portals',
  resources: 'Resources',
  ravenstar: 'Ravenstar',
  codex: 'Codex',
};

export const galleryCategories: Array<'All' | GalleryCategory> = [
  'All',
  'framework',
  'pillars',
  'phoenix',
  'keys',
  'garden',
  'portals',
  'resources',
  'ravenstar',
  'codex',
];

export const getImagesByCategory = (category: GalleryCategory): GalleryImage[] =>
  galleryImages.filter((img) => img.category === category);

export const getFeaturedImages = (limit = 4): GalleryImage[] =>
  galleryImages.slice(0, limit);

const normaliseImageKey = (src: string): string =>
  src
    .toLowerCase()
    .replace(/^\/?gallery\//, '')
    .replace(/^\/?public\/gallery\//, '')
    .replace(/^\/?images\/garden\//, '')
    .replace(/^\/?public\/images\/garden\//, '')
    .replace(/\.(png|jpe?g|webp|gif|avif)$/i, '');

export const findGalleryImageBySrc = (src: string): GalleryImage | undefined => {
  const wanted = normaliseImageKey(src);

  return galleryImages.find((img) => normaliseImageKey(img.src) === wanted);
};
