import fs from 'node:fs'
import { resolve } from 'pathe'
import consola from 'consola'

function main () {
  // This script is used to check which images are not used by any association
  // Associations are stored in `/content/associations-etudiantes/data/*.json`
  // Images are stored in `/public/assets/associations/images/*.png`
  consola.start('Checking if each image is used by an association...')

  const associationsPath = resolve('./content/associations-etudiantes/data')

  // Read all the association
  const associations = fs.readdirSync(associationsPath)

  // Read all the images
  const images = fs.readdirSync('./public/assets/associations/images')

  let linked = 0
  // Check if all the images are used by an association
  for (const image of images) {
    const name = image.replace('.png', '')
    if (!associations.includes(`_${name}.json`)) {
      linked++
      consola.warn(`Unused image ${name} (${resolve('./public/assets/associations/images', image)})`)
    }
  }

  if (linked === 0) { consola.success('Each image is used by an association 🎉') } else { consola.fatal(`${linked} images are not used by any association`) }
}

main()
