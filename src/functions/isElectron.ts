export function isElectron(): boolean {
  return (window.process as any)?.type === "renderer"
}
