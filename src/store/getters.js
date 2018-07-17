/* eslint-disable */
export const time = (state) => {
  const s = (state.time.seconds < 10) ?
    `0${state.time.seconds}` : state.time.seconds;

  const m = (state.time.minutes < 10) ?
    `0${state.time.minutes}` : state.time.minutes;

  return `${m}:${s}`;
};
