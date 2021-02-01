export const watchedEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

export const watchIdleTime = (timeInMs: number, callback: Function) => {
  let time;
  const resetTimer = () => {
    clearTimeout(time);
    time = setTimeout(() => callback(), timeInMs);
  };

  window.addEventListener('load', resetTimer, true);
  watchedEvents.forEach((name) => {
    document.addEventListener(name, resetTimer, true);
  });
};
