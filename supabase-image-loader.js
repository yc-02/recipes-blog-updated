const projectId = 'jhhiftizhiucenzpyxqd'

export default function supabaseLoader({ src, width, quality }) {
  const url = new URL(`https://${projectId}.supabase.co/storage/v1/object/public/${src}`)
  url.searchParams.set('width', width.toString())
  url.searchParams.set('quality', (quality || 75).toString())
  return url.href
}
