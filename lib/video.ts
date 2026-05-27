export function isYoutubeVideo(url: string): boolean {
  return url.includes("youtube.com/embed") || url.includes("youtu.be");
}
