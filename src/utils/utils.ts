export function debounce(f: Function, d: number)
{
  let timer: number;
  return function(...args: any[])
  {
    clearTimeout(timer);
    timer = setTimeout(() => f.apply(this, args), d);
  };
};