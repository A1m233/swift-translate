export function debounce(f, d)
{
  let timer;
  return function(...args)
  {
    clearTimeout(timer);
    timer = setTimeout(() => f.apply(this, args), d);
  };
};