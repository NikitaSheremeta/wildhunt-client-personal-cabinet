import { reactive } from 'vue';
import { magicNumbers } from '@/utils/magic-numbers';

export function useTimer() {
  const data = reactive({
    active: false,
    time: '00:00',
    createTimer: (duration) => {
      createTimer(duration);
    },
    checkTimer: () => {
      checkTimer();
    }
  });

  const storageTimestamp = localStorage.getItem('timerTimestamp');
  const storageDuration = localStorage.getItem('timerDuration');

  const updateDataTime = (duration) => {
    let minutes = Math.floor(duration / magicNumbers.SIXTY_SECONDS);
    let seconds = Math.floor(duration % magicNumbers.SIXTY_SECONDS);

    minutes = minutes < magicNumbers.TEN_SECONDS ? '0' + minutes : minutes;
    seconds = seconds < magicNumbers.TEN_SECONDS ? '0' + seconds : seconds;

    data.time = minutes + ':' + seconds;
  };

  const destroyTimer = () => {
    localStorage.removeItem('timerTimestamp');
    localStorage.removeItem('timerDuration');

    data.active = false;
  };

  const timerHandle = (duration) => {
    if (duration > 0) {
      data.active = true;

      updateDataTime(duration);

      --duration;

      const interval = setInterval(() => {
        updateDataTime(duration);

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
  };

  const createTimer = (duration) => {
    const currentTimestamp = Math.floor(Date.now() / magicNumbers.ONE_THOUSAND_MILLISECONDS);

    localStorage.setItem('timerTimestamp', currentTimestamp.toString());
    localStorage.setItem('timerDuration', duration);

    timerHandle(duration);
  };

  const checkTimer = () => {
    const currentTimestamp = Math.floor(Date.now() / magicNumbers.ONE_THOUSAND_MILLISECONDS);

    const timeDifference = storageDuration - (currentTimestamp - storageTimestamp);

    timerHandle(timeDifference);
  };

  return data;
}
