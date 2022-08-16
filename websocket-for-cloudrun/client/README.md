Set Up
```bash
$ firebase login
Already logged in as higashi.kota@gri.jp

$ firebase init

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  /home/gri-user/gri-wrksp/App-Club-Web-Chat-App/chat-simple-client-server-app/client

? Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. Hosting: Configure files for Firebase Hosting and (optionally) set up Git
Hub Action deploys

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

? Please select an option: Use an existing project
? Select a default Firebase project for this directory: something (something)
i  Using project something (something)

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No
? File build/index.html already exists. Overwrite? No
i  Skipping write of build/index.html

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!
```

Build

```bash
$ yarn build
yarn run v1.22.17
warning package.json: No license field
$ react-scripts build
Creating an optimized production build...
Compiled with warnings.

./src/components/Chat/Chat.js
  Line 37:6:  React Hook useEffect has an unnecessary dependency: 'ENDPOINT'. Either exclude it or remove the dependency array. Outer scope values like 'ENDPOINT' aren't valid dependencies because mutating them doesn't re-render the component  react-hooks/exhaustive-deps

Search for the keywords to learn more about each warning.
To ignore, add // eslint-disable-next-line to the line before.

File sizes after gzip:

  103.42 KB  build/static/js/2.eed967d5.chunk.js
  2.04 KB    build/static/js/main.b50b4078.chunk.js
  1012 B     build/static/css/main.5d41ca5f.chunk.css
  772 B      build/static/js/runtime~main.3d204cac.js

The project was built assuming it is hosted at the server root.
You can control this with the homepage field in your package.json.
For example, add this to build it for GitHub Pages:

  "homepage" : "http://myname.github.io/myapp",

The build folder is ready to be deployed.
You may serve it with a static server:

  yarn global add serve
  serve -s build

Find out more about deployment here:

  https://bit.ly/CRA-deploy

Done in 16.47s.
```

Deploy

```bash
$ time firebase deploy

=== Deploying to 'something'...

i  deploying hosting
i  hosting[something]: beginning deploy...
i  hosting[something]: found 13 files in build
✔  hosting[something]: file upload complete
i  hosting[something]: finalizing version...
✔  hosting[something]: version finalized
i  hosting[something]: releasing new version...
✔  hosting[something]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/something/overview
Hosting URL: https://something.web.app

real    0m11.231s
user    0m2.880s
sys     0m0.168s
```