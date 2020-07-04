This is a single page Next.js web application that redesign the App Store listing page. There are 3 major features: app listing, app recommendation and search.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

OR

It deploys on Vercel. You can access [https://applist-gamma.vercel.app/](https://applist-gamma.vercel.app/).


## No 'Access-Control-Allow-Origin' Header Solution

Problem: 
Access to fetch at 'https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-grossing/all/10/explicit.json' from origin 'https://applist-gamma.vercel.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

Solution:
Install CORS Unblock extension to load your page.
