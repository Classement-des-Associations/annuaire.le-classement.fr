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

  const unlinked = []
  // Check if all the associations have an image
  for (const association of associations) {
    const name = association.replace('.json', '').replace(/_/g, '')
    if (!images.includes(`${name}.png`)) {
      unlinked.push(name)
    }
  }

  let logs = ''
  for (const name of unlinked) {
    const isLast = unlinked.indexOf(name) === unlinked.length - 1
    logs += `  ${isLast ? '└─' : '├─'} ${name}\n`
  }

  if (unlinked.length === 0) { consola.success('Each association have an image 🎉') } else {
    consola.fatal(`${unlinked.length} associations does not have an image:\n${logs}`)
  }
}

main()
