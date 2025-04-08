# Neurosongs Front-end

This is the GitHub repository for the front-end website for the Neurosongs website, also created by me. It aims to be a mix between YouTube, Spotify, and a hint of Metacritic, taking the streaming capabilities of Spotify, the community aspect of YouTube, and the rating system from Metacritic.

## Cloning the project

To clone the project, set your terminal to your chosen directory, then run:

    git clone https://github.com/AlexMan123456/neurosongs-front-end

Now navigate into the repository:

    cd neurosongs-front-end

Install all required dependencies using:

    npm install

A list of all dependencies and their required versions can be found in the `package.json` file.

## Setting up Environment Variables

To set up environment variables, create a `.env` file. Add the base URL to the back-end server as follows:

    VITE_API_BASE_URL=your_api_url

You will also need to add the base URL of the site itself. This is for the password reset and email link page. In the development environment, this will be localhost on port 5173. Add it as follows:

    VITE_BASE_URL=http://localhost:5173

NOTE: All environment variables must be prefixed with VITE_ in order to work with the app, for some reason.

## Firebase

### General setup and Environment Variables

In order to make use of the file storage and authentication, you will need to link the project to a Firebase project. Sign up to Firebase [here](https://firebase.google.com/?gad_source=1&gclid=CjwKCAiAlPu9BhAjEiwA5NDSA0NMAcY6FbpP4gRMC9gR49YFXUeUDYg8xKgo00bcc0xBsejMOC5hehoCYXkQAvD_BwE&gclsrc=aw.ds), then when you get to the Firebase console, click on 'Create a project'. From there, just follow all instructions. You can leave all recommended features enabled. For analytics, choose 'Default Account for Firebase'.

Once you're in the project page, choose to add a web application. Choose a name for your project, then choose to use Firebase SDK with NPM. You'll then be shown some JavaScript code, which is similar to what's currently in `firebase-config.js`. Take note of the properties in the `firebaseConfig` object, then add those to a `.env` file, capitalising every variable name and separate words with underscores. You also need to prefix them with VITE_FIREBASE_ to help distinguish the firebase variables from some of the other ones I have. For example:

    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    ...

### Storage

From there, choose to add storage to your project. You may be asked to add a Cloud Billing account, in which case, go ahead and add it. You shouldn't be charged as long as you don't exceed the maximum limits provided by Firebase. From there, go to the rules tab, then add the following rules:

    rules_version = '2';

    // Craft rules based on data in your Firestore database
    // allow write: if firestore.get(
    //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
    service firebase.storage {
        match /b/{bucket}/o {
            match /{allPaths=**} {
                allow read: if true;
                allow write: if false;
                allow delete: if false;
            }
            match /{userId} {
                allow read: if true
            allow delete: if request.auth.uid == userId;
            
            }
            match /{userId}/images/profile-picture/{image} {
                allow read: if true;
                allow write: if request.auth.uid == userId;
                allow delete: if request.auth.uid == userId;
            }
            match /{userId}/albums/{albumId}/songs/{song} {
                allow read: if true;
                allow write: if request.auth.uid == userId;
                allow delete: if request.auth.uid == userId;
            }
            match /{userId}/albums/{albumId}/images/{image} {
                allow read: if true;
                allow write: if request.auth.uid == userId;
                allow delete: if request.auth.uid == userId;
            }
        }
    }

This basically sets the permissions for who can access different folders in the file storage. The way it's currently set up as of now, all users can read any directory (which would be required to let them listen to songs), but users can only upload files to, and delete files from their own designated folder named after their user ID.

### Authentication

You will also need to add Authentication to your project. Choose to add authentication by email/password (also allowing people to sign in with email link), and Google Authentication.

### App Checking

You will need to set up app checking to allow the project to communicate with the back-end API successfully. Any POST, PATCH, or DELETE request made without this set up will result in a 401 error.

App check with Neurosongs is done with reCAPTCHA v3. To generate the necessary keys for your project, go to [this site](https://www.google.com/recaptcha/admin/create) and sign in with the same account you're using for Firebase. Choose whatever label you want, then select the reCAPTCHA type to be `Score based (v3)`. In the domains, add `localhost` so that it recognises requests coming from your locally hosted development environment. Do not include the port number.

Once you submit everything, you will be shown a page containing your site key and secret key. Copy the site key and add it to your `.env` file like so:
    
    VITE_RECAPTCHA_SITE_KEY=your_site_key

As for the secret key, the site itself does not need to know this. Instead, you will be adding this in the Firebase console. In the Firebase console, go to your project and register your site with app check. Choose reCAPTCHA (**not** reCAPTCHA Enterprise), and then paste your secret key in the `reCAPTCHA secret key` textfield provided. Once you save your changes here, assuming the back-end has been set up for app checking, it should now be working. To find out how to set up the front-end for app checking, see the corresponding Firebase App Checking section of the [`README.md` in the back-end repository](https://github.com/AlexMan123456/neurosongs-back-end/blob/main/README.md)

## Running the Site in Development Mode

To run the site, simply run

    npm run dev

Also make sure that your back-end server is running so that the site can make requests to it.

## Extra links

Link to hosted site: https://neurosongs.netlify.app/

Link to back-end repository: https://github.com/AlexMan123456/neurosongs-back-end