import { magicNumbers } from '@/utils/magic-numbers';

function timeConversion(duration) {
  const minutes = Math.floor(duration / magicNumbers.SIXTY_SECONDS);
  const seconds = Math.floor(duration % magicNumbers.SIXTY_SECONDS);

  return {
    minutes: minutes < magicNumbers.TEN_SECONDS ? '0' + minutes : minutes,
    seconds: seconds < magicNumbers.TEN_SECONDS ? '0' + seconds : seconds
  };
}

function destroyTimer() {
  localStorage.removeItem('timerTimestamp');
  localStorage.removeItem('timerDuration');
  localStorage.removeItem('timerOn');
}

function timerHandle(element, duration) {
  if (duration > 0) {
    let { minutes, seconds } = timeConversion(duration);

    if (element.value) {
      element.value.innerHTML = minutes + ':' + seconds;
    }

    --duration;

    const interval = setInterval(() => {
      ({ minutes, seconds } = timeConversion(duration));

      if (element.value) {
        element.value.innerHTML = minutes + ':' + seconds;
      }

      --duration;

      if (duration < 0) {
        destroyTimer();

        clearInterval(interval);
      }
    }, magicNumbers.ONE_THOUSAND_MILLISECONDS);
  }

  if (duration < 0) {
    destroyTimer();
  }
}

export function createTimer(element, duration) {
  const currentTimestamp = Math.floor(Date.now() / magicNumbers.ONE_THOUSAND_MILLISECONDS);

  localStorage.setItem('timerTimestamp', currentTimestamp.toString());
  localStorage.setItem('timerDuration', duration);
  localStorage.setItem('timerOn', '1');

  timerHandle(element, duration);
}

export function checkTimer(element) {
  const currentTimestamp = Math.floor(Date.now() / magicNumbers.ONE_THOUSAND_MILLISECONDS);

  const duration = localStorage.getItem('timerDuration');
  const storageTimestamp = localStorage.getItem('timerTimestamp');

  const timeDifference = duration - (currentTimestamp - storageTimestamp);

  timerHandle(element, timeDifference);
}
