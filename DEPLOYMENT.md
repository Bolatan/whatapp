# Deploying to Render

This guide will walk you through the process of deploying your MERN stack application to Render.

## 1. Prepare Your Project for Production

### Backend (`server`)

Your Express server needs to be configured to serve the static files from your React frontend in a production environment.

1.  **Modify `server/server.js`:**

    Add the following code to your `server.js` file. This will tell Express to serve the built React app.

    ```javascript
    const path = require('path');

    // ... after your API routes

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/build')));

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
      });
    }
    ```

2.  **Update `server/package.json`:**

    Add a `start` script to your `package.json` file.

    ```json
    "scripts": {
      "start": "node server.js"
    }
    ```

### Frontend (`client`)

No changes are needed for the frontend code itself.

## 2. Configure Your Render Web Service

1.  **Create a New Web Service:**

    *   Go to your [Render dashboard](https://dashboard.render.com/).
    *   Click **New** > **Web Service**.
    *   Connect your GitHub or GitLab repository.

2.  **Settings:**

    *   **Name:** Choose a name for your service (e.g., `whatsapp-clone`).
    *   **Root Directory:** `server`
    *   **Environment:** `Node`
    *   **Build Command:** `npm install && cd ../client && npm install && npm run build`
    *   **Start Command:** `npm start`

3.  **Environment Variables:**

    *   Click on the **Environment** tab.
    *   Add the following environment variables:
        *   `MONGO_URI`: `<YOUR_MONGO_URI>` (Replace with your actual MongoDB connection string)
        *   `NODE_ENV`: `production`

## 3. Deploy

*   Click **Create Web Service**.

Render will now pull your code from your repository, run the build command to install dependencies and build your React app, and then run the start command to start your Express server. Your application will be live at the URL provided by Render.
