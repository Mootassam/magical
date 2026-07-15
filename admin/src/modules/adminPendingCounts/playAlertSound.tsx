let audio: HTMLAudioElement | null = null;

// Best-effort notification chime. Playback can legitimately fail (browser
// autoplay policy before the user has interacted with the page, or the
// sound file missing) - the visual badge count is the source of truth
// regardless. We still log the reason instead of swallowing it silently,
// so a real problem (e.g. a 404) is visible in devtools instead of just
// looking like "nothing happens".
export default function playAlertSound() {
  try {
    if (!audio) {
      audio = new Audio('/sound/alert.m4a');
    }

    audio.currentTime = 0;
    audio.play()?.catch((error) => {
      console.warn('[adminPendingCounts] alert sound could not play:', error?.message || error);
    });
  } catch (error) {
    console.warn('[adminPendingCounts] alert sound could not play:', error);
  }
}
