export const getImageFromAssets = (imageUrl: string) => {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    '/src/assets/*.{jpeg,jpg,png,gif,webp,svg}',
  )

  if (!images[imageUrl]) {
    throw new Error(`Image ${imageUrl} not found`)
  }

  return images[imageUrl]()
}

export const HTMLtoText = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '')
}