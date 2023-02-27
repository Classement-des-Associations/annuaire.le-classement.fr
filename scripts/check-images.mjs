import fs from 'node:fs'
import { resolve } from 'pathe'
import consola from 'consola'

function main () {
  // This script is used to check which associations don't have images
  // Associations are stored in `/content/associations-etudiantes/data/*.json`
  // Images are stored in `/public/assets/associations/images/*.png`

  const associationsPath = resolve('./content/associations-etudiantes/data')

  // Read all the association
  const associations = fs.readdirSync(associationsPath)

  // Read all the images
  const images = fs.readdirSync('./public/assets/associations/images')

  // Check if all the associations have an image
  for (const association of associations) {
    const name = association.replace('.json', '').replace(/_/g, '')
    if (!images.includes(`${name}.png`)) {
      consola.warn(`Missing image for ${name} (${resolve(associationsPath, association)})`)
    }
  }
}

main()
