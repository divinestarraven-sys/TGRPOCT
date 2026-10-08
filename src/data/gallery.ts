export interface GalleryImage {
  src: string;
  srcOptimized?: string;
  srcWebp?: string;
  /** Larger copy to open in the lightbox / detail views (falls back to src) */
  srcFull?: string;
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
    alt: 'Keys to The Kingdom Delta Master Key Map integrating six keys, seven portals, and the Garden system (historical Seven-Portal Delta edition)',
    title: 'Keys to The Kingdom — Delta Garden Integration (Archive)',
    category: 'keys',
    description: 'Historical Seven-Portal Delta edition: a detailed master key map integrating six keys, seven portals, harmonic correspondences, and Garden infrastructure. The current framework uses the Nine-Portal 3.6.9/Omega structure.',
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
    src: '/images/garden/gr-master-369-thumb.jpg',
    srcFull: '/images/garden/gr-master-369-web.jpg',
    alt: 'Master Map 3.6.9 of the Green Resonance Community Garden — eight outer portals around the Central Heart, Spain compass 4 north, 7 northeast, 3 east, 2 southeast, 1 south, 8 southwest, 6 west, 5D northwest, 9 centre',
    title: 'Master Map 3.6.9 (Current)',
    category: 'garden',
    description: 'The current community garden map: eight outer portals in a regular octagon with walk-through arches, converging on Portal 9 — the Central Heart. © 2026 Ravenstar & Kelly Murphy — The Green Resonance Project. All Rights Reserved.',
  },
  {
    src: '/images/garden/gr-p1-awareness-thumb.jpg',
    srcFull: '/images/garden/gr-p1-awareness-web.jpg',
    alt: 'Zone map of Portal 1 — Awareness, The Silver Grove, at the south position',
    title: 'Portal 1 — Awareness (Current)',
    category: 'portals',
    description: 'Current map of the Awareness portal at the Spain/South position: food forest, herb garden, meditation groves, and the Ravenstar Moon Observatory.',
  },
  {
    src: '/images/garden/gr-p2-ethics-thumb.jpg',
    srcFull: '/images/garden/gr-p2-ethics-web.jpg',
    alt: 'Zone map of Portal 2 — Ethics, The Hearth of Integrity, at the southeast position',
    title: 'Portal 2 — Ethics (Current)',
    category: 'portals',
    description: 'Current map of the Ethics portal at the Spain/Southeast position: founding accommodation, crew kitchen, and the separate Council Hall.',
  },
  {
    src: '/images/garden/gr-p3-earth-thumb.jpg',
    srcFull: '/images/garden/gr-p3-earth-web.jpg',
    alt: 'Zone map of Portal 3 — Earth, The Manifestation Grounds, at the east position',
    title: 'Portal 3 — Earth (Current)',
    category: 'portals',
    description: 'Current map of the Earth portal at the Spain/East position: productive gardens, water systems, chicken rotation, and composting.',
  },
  {
    src: '/images/garden/gr-p4-flow-thumb.jpg',
    srcFull: '/images/garden/gr-p4-flow-web.jpg',
    alt: 'Zone map of Portal 4 — Flow, The Pattern Trails, at the north position',
    title: 'Portal 4 — Flow (Current)',
    category: 'portals',
    description: 'Current map of the Flow portal at the Spain/North position: ponds, wetlands, walking trails, and wildlife habitat.',
  },
  {
    src: '/images/garden/gr-p5d-astral-thumb.jpg',
    srcFull: '/images/garden/gr-p5d-astral-web.jpg',
    alt: 'Zone map of Portal 5D — Astral Portal, The Rhythmic Weave, at the northwest position',
    title: 'Portal 5D — The Rhythmic Weave (Current)',
    category: 'portals',
    description: 'Current map of the Astral portal at the Spain/Northwest position: Musement Stage, monthly ceremony, music, and collective resonance.',
  },
  {
    src: '/images/garden/gr-p6-muse-thumb.jpg',
    srcFull: '/images/garden/gr-p6-muse-web.jpg',
    alt: 'Zone map of Portal 6 — Ethereal Muse, The Play-Space, at the west position',
    title: 'Portal 6 — Ethereal Muse (Current)',
    category: 'portals',
    description: 'Current map of the Ethereal Muse portal at the Spain/West position: natural amphitheatre, wooden band stage, art, play, and bodywork areas.',
  },
  {
    src: '/images/garden/gr-p7-renewal-thumb.jpg',
    srcFull: '/images/garden/gr-p7-renewal-web.jpg',
    alt: 'Zone map of Portal 7 — Renewal, The Healing House, at the northeast position',
    title: 'Portal 7 — Renewal (Current)',
    category: 'portals',
    description: 'Current map of the Renewal portal at the Spain/Northeast position: clinic, science, and apothecary functions with future professional scope.',
  },
  {
    src: '/images/garden/gr-p8-communion-thumb.jpg',
    srcFull: '/images/garden/gr-p8-communion-web.jpg',
    alt: 'Zone map of Portal 8 — Communion, The Gathering Waters, at the southwest position',
    title: 'Portal 8 — Communion (Current)',
    category: 'portals',
    description: 'Current map of the Communion portal at the Spain/Southwest position: three guest yurts, hospitality and exchange areas, and a separate guest tea kitchen.',
  },
  {
    src: '/images/garden/gr-p9-heart-thumb.jpg',
    srcFull: '/images/garden/gr-p9-heart-web.jpg',
    alt: 'Zone map of Portal 9 — Central Heart, The Resonance Circle, at the centre',
    title: 'Portal 9 — Central Heart (Current)',
    category: 'portals',
    description: 'Current map of the Central Heart at the centre: the Oak, labyrinth, Council and ceremony circle, water, and eight radial gateways.',
  },
  {
    src: '/images/garden/Green_Resonance_Master_Map_3_0_Delta.jpg',
    alt: 'Green Resonance Master Map 3.0 Delta — historical Seven-Portal bioregional garden layout (archive)',
    title: 'Master Map 3.0 Delta (Archive — Seven Portals)',
    category: 'garden',
    description: 'Historical Seven-Portal Delta edition: the earlier bioregional garden layout. The current architecture is the Nine-Portal Master Map 3.6.9 — eight outer portals plus the Central Heart.',
  },
  {
    src: '/images/garden/Portal_1_North_Awareness_Silver_Grove.jpg',
    alt: 'Portal 1 map — Awareness, The Silver Grove (historical Seven-Portal Delta edition)',
    title: 'Portal 1 — The Silver Grove (Archive)',
    category: 'portals',
    description: 'Historical Delta-edition map of the Awareness portal: food forest, meditation groves, herb garden, and Ravenstar Moon Observatory. Current title: Portal 1 — Awareness (Spain/Omega position: South).',
  },
  {
    src: '/images/garden/Portal_2_Ethics_Hearth_of_Integrity.jpg',
    alt: 'Portal 2 map — Ethics, The Hearth of Integrity (historical Seven-Portal Delta edition)',
    title: 'Portal 2 — The Hearth of Integrity (Archive)',
    category: 'portals',
    description: 'Historical Delta-edition map of the Ethics portal: eco-housing cluster, community kitchen, council circle, and shared food systems. Current title: Portal 2 — Ethics (Spain/Omega position: Southeast).',
  },
  {
    src: '/images/garden/Portal_3_East_Earth_Manifestation_Grounds.jpg',
    alt: 'Portal 3 map — Earth, The Manifestation Grounds (historical Seven-Portal Delta edition)',
    title: 'Portal 3 — The Manifestation Grounds (Archive)',
    category: 'portals',
    description: 'Historical Delta-edition map of the Earth portal: working farm, regenerative plots, orchards, composting. Current title: Portal 3 — Earth (Spain/Omega position: East).',
  },
  {
    src: '/images/garden/Portal_4_South_Flow_Pattern_Trails.jpg',
    alt: 'Portal 4 map — Flow, The Pattern Trails (historical Seven-Portal Delta edition)',
    title: 'Portal 4 — Pattern Trails (Archive)',
    category: 'portals',
    description: 'Historical Delta-edition map of the Flow portal: walking trails, water features, systems-thinking landscape. Current title: Portal 4 — Flow (Spain/Omega position: North).',
  },
  {
    src: '/images/garden/Portal_5D_Astral_Rhythmic_Weave.jpg',
    alt: 'Portal 5D map — Astral Portal, The Rhythmic Weave (historical Seven-Portal Delta edition)',
    title: 'Portal 5D — The Rhythmic Weave (Archive)',
    category: 'portals',
    description: 'Historical Delta-edition map of the Astral portal: Musement Stage, dancefloor, ecstatic dance, ceremony circle. Current title: Portal 5D — Astral Portal (Spain/Omega position: Northwest).',
  },
  {
    src: '/images/garden/Portal_6_West_Ethereal_Muse_Play_Space.jpg',
    alt: 'Portal 6 map — Ethereal Muse, The Play-Space (historical Seven-Portal Delta edition)',
    title: 'Portal 6 — The Play-Space (Archive)',
    category: 'portals',
    description: 'Historical Delta-edition map of the Ethereal Muse portal: art studios, sound garden, play gardens, amphitheatre. Current title: Portal 6 — Ethereal Muse (Spain/Omega position: West).',
  },
  {
    src: '/images/garden/Portal_7_Central_Heart_Resonance_Circle.jpg',
    alt: 'Central Heart map — The Resonance Circle (historical Seven-Portal Delta edition; now Portal 9)',
    title: 'Central Heart — The Resonance Circle (Archive, now Portal 9)',
    category: 'portals',
    description: 'Historical Delta edition showing the Central Heart as Portal 7. In the current Nine-Portal framework the Central Heart is Portal 9 — The Resonance Circle, at the centre with eight radial gateways.',
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
