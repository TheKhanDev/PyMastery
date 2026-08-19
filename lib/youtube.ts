import { modules } from './courseData';

export const YOUTUBE_PLAYLIST_URL = 'https://youtube.com/playlist?list=PLeJrMZyiCLcw&si=Xv5yl0JeN8x6k6ie';
export const YOUTUBE_PLAYLIST_ID = 'PLeJrMZyiCLcw';

export function playlistEmbedUrl(index?: number): string {
  const base = `https://www.youtube.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}&rel=0&modestbranding=1`;
  return typeof index === 'number' ? `${base}&index=${index}` : base;
}

export interface PlaylistVideoSlot {
  index: number; // 0-based position within the playlist
  title: string;
  subtitle: string;
  icon: string;
  color: string;
}

// The YouTube Data API (needed to fetch real playlist video titles/thumbnails) requires
// a backend + API key, which is out of scope here. Instead we present an ordered,
// sequential list of "video slots" mirroring the course modules — tapping one jumps the
// embedded player to that position in the playlist via the `index` parameter.
export const PLAYLIST_VIDEO_SLOTS: PlaylistVideoSlot[] = modules.map((mod, i) => ({
  index: i,
  title: mod.title,
  subtitle: mod.subtitle,
  icon: mod.icon,
  color: mod.color,
}));
