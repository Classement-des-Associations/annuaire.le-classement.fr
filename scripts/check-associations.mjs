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

  const unlinked = []
  // Check if all the images are used by an association
  for (const image of images) {
    const name = image.replace('.png', '')
    if (!associations.includes(`_${name}.json`)) {
      unlinked.push(name)
    }
  }

  let logs = ''
  for (const name of unlinked) {
    const isLast = unlinked.indexOf(name) === unlinked.length - 1
    logs += `  ${isLast ? '└─' : '├─'} ${name}\n`
  }

  if (unlinked.length === 0) { consola.success('Each image have an association 🎉') } else {
    consola.fatal(`${unlinked.length} images are not used by any association:\n${logs}`)
  }
}

main()
