export const debounce = (callback, delay = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

export const insertBetweenNodes = (
  nodes,
  renderInsertion
) => (
  nodes.reduce(
    (acc, node, i, arr) => [
      ...acc,
      node,
      ...(i < arr.length - 1 ? [renderInsertion(i)] : [])
    ],
    []
  )
);
