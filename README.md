# Template Project nextjs with Tailwind

## Steps for create basic template

### Create App
```bash
npx create-next-app@latest
```

### Install Standard and prettier in Development Dependencies
```bash
npm install standard prettier -D
```
### Install tailwindcss postcss autoprefixer
```bash
npm install -D tailwindcss postcss autoprefixer
```

### Init Tailwindcss 
```bash
 npx tailwind init -p
 ```

### create file .prettierrc.json in root folder with following code
```json
{
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "trailingComma": "none"
}
```
 

 ### add standard to eslint config, open .eslintrc.json and add "./node_modules/standard/eslintrc.json" to extends array

 ```json
 {
  "extends": [
    "next/core-web-vitals",
    "./node_modules/standard/eslintrc.json"
  ]
}
```

### Edit tailwind.config.js and add './src/**/*.{js,ts,jsx,tsx}' to content array

### Add to .css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```


## Default Docs

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
