import ShortUniqueId from 'short-unique-id'

export function getSmallUUID(): string {
  const uid = new ShortUniqueId({ length: 10 })
  return uid.rnd() // p0ZoB1FwH6
}
