const projectId = 'jhhiftizhiucenzpyxqd'

export default function supabaseLoader({ src, width, quality }) {

  if(src.startsWith('/'||'./')){
    return src
  }
 if(!src.startsWith('https')){
    const url = new URL(`https://${projectId}.supabase.co/storage/v1/object/public/${src}`)
    url.searchParams.set('width', width.toString())
    url.searchParams.set('quality', (quality || 75).toString())
    return url.href
  }else{
    const url = new URL(src)
      url.searchParams.set('width', width.toString())
      url.searchParams.set('quality', (quality || 75).toString())
      return url.href
    }
}



