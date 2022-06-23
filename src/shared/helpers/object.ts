export const checkObjectIsEmpty = (data: Record<string, any>) => {
  for (let _ in data) return false;
  return true;
};
