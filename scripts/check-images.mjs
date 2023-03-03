import fs from 'node:fs'
import consola from 'consola'
import { resolve } from 'pathe'

function main () {
  // This script is used to check which associations don't have images
  // Associations are stored in `/content/associations-etudiantes/data/*.json`
  // Images are stored in `/public/assets/associations/images/*.png`
  consola.start('Checking if each association has an image...')

  const associationsPath = resolve('./content/associations-etudiantes/data')

  // Read all the association
  const associations = fs.readdirSync(associationsPath)

  // Read all the images
  const images = fs.readdirSync('./public/assets/associations/images')

  let linked = 0
  // Check if all the associations have an image
  for (const association of associations) {
    const name = association.replace('.json', '').replace(/_/g, '')
    if (!images.includes(`${name}.png`)) {
      linked++
      consola.warn(`Missing image for ${name} (${resolve(associationsPath, association)})`)
    }
  }

  if (linked === 0) { consola.success('Each association have an image 🎉') } else { consola.fatal(`${linked} associations does not have an image`) }
}

main()
