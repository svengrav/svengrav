
interface AnimateProgressOptions {
  startValue: number;
  endValue: number;
  duration: number;
  onUpdate: (value: number) => void;
  onComplete?: () => void;
}

export const animateProgress = ({
  startValue,
  endValue,
  duration,
  onUpdate,
  onComplete
}: AnimateProgressOptions): void => {
  let startTime: number | undefined;

  function step(timestamp: number): void {
    // Starttime for the first frame
    if (startTime === undefined) {
      startTime = timestamp;
    }

    // Elapsed time since the start
    const elapsed = timestamp - startTime;

    // Progress factor between 0 and 1
    const progressFactor = Math.min(elapsed / duration, 1);
    const currentValue = startValue + (endValue - startValue) * progressFactor;

    onUpdate(currentValue);

    if (progressFactor < 1) {
      requestAnimationFrame(step);
    } else {
      if (onComplete) {
        onComplete();
      }
    }
  }
  requestAnimationFrame(step);
}
