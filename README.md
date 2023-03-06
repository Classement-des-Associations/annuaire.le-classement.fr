# annuaire.le-classement.fr

A website to display every french student association.

*Created by [Le Classement](https://le-classement.fr)*

## Tech Stack

**Client:** Nuxt3, Nuxt Content, TailwindCSS

**Server:** Netlify


## Run Locally

Clone the project

```bash
  git clone https://github.com/Classement-des-Associations/annuaire.le-classement.fr.git
```

Go to the project directory

```bash
  cd annuaire.le-classement.fr
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm run dev
```

## Deployment

First, you need to build this project.

```bash
  pnpm run generate
```

This website is statically. generated. You can deploy it on Netlify or any other static hosting service.

Then, you can preview the result.

```bash
  pnpm run preview
```

## CI

Periodically, a GitHub Action will run to fetch the latest data from our API. If new data are available, a PR will be created to update the data.

In order to know which images are missing or which images are not used anymore, we use two scripts that also run in the CI. Please, verify logs in the CI in order to add or remove images.

You can run these scripts locally with:

```bash
pnpm run check-images
pnpm run check-images-usage
```

## Handle images

Each association must have an image. They are stored in the `public/associations/images` folder.

The image name must be the slug of the association.
The image extension must be `.png`.
The image must be a 400x400 square (but it can be a rectangle where one side is 400px and the other is less than 400px).

## Authors

- [@barbapapazes](https://www.github.com/barbapapazes)
