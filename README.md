## Intro

Phygital FE mono repo includes all the repository for website that be used in phygital labs companies.

### Apps and Packages

- `admin`: a Vite + React app. Use for Admin CMS and Admin Marketplace
- `item`: [Next.js](https://nextjs.org/) app. Use for display website after scan the NFC
- `marketplace`: another [Next.js](https://nextjs.org/) app. Use for Marketplace
- `nomion`: another [Next.js](https://nextjs.org/) app. Nomion website
- `phygilabs`: another [Next.js](https://nextjs.org/) app. Phygilabs website

### Install
To install all apps, run:
```
pnpm install
```

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

To build each app seperately, run the following command:
- `admin`: pnpm build:admin
- `item`: pnpm build:item
- `marketplace`: pnpm build:marketplace
- `nomion`: pnpm build:nomion
- `phygilabs`: pnpm build:phygilabs

### Develop

To run dev all apps and packages, run the following command:

```
pnpm dev
```


To run each app seperately, run the following command:
- `admin`: pnpm dev:admin
- `item`: pnpm dev:item
- `marketplace`: pnpm dev:marketplace
- `nomion`: pnpm dev:nomion
- `phygilabs`: pnpm dev:phygilabs
