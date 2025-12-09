export const formatId = (string: string): string => {
  const simple = string.toLowerCase().replace(/\s+/g, '-')
  // remove all non-alphanumeric and non-hyphen characters
  // as well as multiple hyphens in a row
  return simple.replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-')
}
