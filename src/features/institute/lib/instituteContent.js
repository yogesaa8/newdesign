export const isPresent = (value) => {
  if (value === null || value === undefined || value === '') return false
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object') return Object.keys(value).length > 0
  return true
}

export const humanize = (value = '') =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())

export const isImage = (value) =>
  value && typeof value === 'object' && typeof value.src === 'string'

export const isButton = (value) =>
  value && typeof value === 'object' && typeof value.label === 'string' && typeof value.url === 'string'

export const courseIndex = (institutes) =>
  institutes.flatMap((institute) =>
    (institute.courses || []).map((course) => ({ course, institute })),
  )

export const orderedEntries = (object, excluded = []) => {
  if (!object) return []
  const order = object.sectionsOrder || []
  const keys = [...order, ...Object.keys(object).filter((key) => !order.includes(key))]
  return [...new Set(keys)]
    .filter((key) => key !== 'sectionsOrder' && !excluded.includes(key) && isPresent(object[key]))
    .map((key) => [key, object[key]])
}
