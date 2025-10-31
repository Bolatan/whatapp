# Deploying to Vercel

This guide will walk you through the process of deploying your MERN stack application to Vercel.

## 1. Prepare Your Project for Production

### Backend (`server`)

Your Express server needs to be configured to work with Vercel's serverless environment.

1.  **Modify `server/server.js`:**

    Vercel expects a single entry point for serverless functions. You'll need to export your Express app.

    ```javascript
    // ... at the end of your file
    module.exports = app;
    ```

### Frontend (`client`)

No changes are needed for the frontend code itself.

## 2. Configure Your Vercel Deployment

1.  **Create a `vercel.json` file:**

    Create a `vercel.json` file in the root of your project. This file will tell Vercel how to build and route your application.

    ```json
    {
      "version": 2,
      "builds": [
        {
          "src": "server/server.js",
          "use": "@vercel/node"
        },
        {
          "src": "client/package.json",
          "use": "@vercel/static-build",
          "config": { "distDir": "build" }
        }
      ],
      "routes": [
        {
          "src": "/api/(.*)",
          "dest": "server/server.js"
        },
        {
          "src": "/(.*)",
          "dest": "client/build/$1"
        }
      ]
    }
    ```

2.  **Update `client/package.json`:**

    Add a `homepage` field to your `client/package.json` file.

    ```json
    "homepage": "."
    ```

## 3. Deploy to Vercel

1.  **Create a New Project:**

    *   Go to your [Vercel dashboard](https://vercel.com/dashboard).
    *   Click **Add New...** > **Project**.
    *   Import your Git repository.

2.  **Configure Project:**

    *   **Framework Preset:** `Other`
    *   **Build & Development Settings:**
        *   **Build Command:** `cd client && npm install && npm run build`
        *   **Output Directory:** `client/build`
        *   **Install Command:** `npm install`
    *   **Environment Variables:**
        *   `MONGO_URI`: `<YOUR_MONGO_URI>` (Replace with your actual MongoDB connection string)
        *   `NODE_ENV`: `production`

3.  **Deploy:**

    *   Click **Deploy**.

Vercel will now build and deploy your application.
