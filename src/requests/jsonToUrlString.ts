export function jsonToUrlString(data: any): string {
  return Object.keys(data).map((key: string) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
  }).join('&')
}