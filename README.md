# Aqueduct Water Risk Atlas


## Getting Started

1. Install Docker
2. Clone the repo: https://github.com/greenriver/aqueduct-water-risk
3. Copy .env.sample to .env
4. Get values for the env variables from another developer
5. Run `docker-compose up` to build your image and fire up the container. Visit localhost:3030. Ctrl-C to stop.


## Deploying

1. Clean out old builds with `rm -f dist/*`
2. Run `docker-compose run web yarn build` to compile.
3. Copy the contents of the `build` directory to the `wriorg` repo.
    - Make sure you are on the `aqueductgr2` branch of the `wriorg` repo.
    - Copy the build to the `wriorg/applications/aqueduct/water-risk-atlas` directory.
4. From the `wriorg` repo, commit and push changes to the `aqueductgr2` branch. Enter your Pantheon password when/if prompted.
    - In your commit message, include the app name and the hash for the commit from that app's repo that you are deploying, for example:
      > Update aqueduct-water-risk to commit 8df15603a5d939995b03ade0429f90434a19e6ca
    - The app is deployed on push to https://aqueductgr2-wriorg.pantheonsite.io/applications/aqueduct/water-risk-atlas/


## Git Flow

1. Create all new branches by branching off `develop`.
2. Open pull requests against `develop` as well.
3. Merge branches into `develop` when they are ready to be deployed for testing.
4. When a change is ready to be deployed to the production website, merge `develop` into `main`.


## Working with `aqueduct-components` in Development

  This repository makes use of a number of components from the [aqueduct-components](https://github.com/greenriver/aqueduct-components) NPM package, which may also need to be modified at times to fulfill requested changes in this repo. Therefore it's sometimes necessary to develop in both **aqueduct-components** and this repo at the same time.
  
  
### Setup
  
This section will detail one method to do this using [yalc](https://github.com/wclr/yalc). Yalc is the preferred solution here due to the use of Docker in development, and this repo includes the setup required to use yalc. Other methods such as `yarn link` are possible alternatives, but may require a different setup than what is provided.

1. Install yalc as described in its [repo](https://github.com/wclr/yalc#installation).  You only need to install it locally.  It will be automatically installed in the Docker container.
2. Clone the [aqueduct-components](https://github.com/greenriver/aqueduct-components) repository to your development environment.
3. Determine which branch you should use in aqueduct-components.  If your app uses `aqueduct-components^1.0.0`, then you want to branch from `main`. If it uses `0.3.*`, you want to branch from `legacy`.  You can verify the current main/legacy versions by checking the "## Versions" tab in the [NPM package](https://www.npmjs.com/package/aqueduct-components)
4. You'll need to add a folder to share the yalc registry with the docker container. This app uses `~/docker/volumes/yalc`, so do `mkdir -p ~/docker/volumes/yalc`.
5. Once you're on the right branch for aqueduct-components and have your yalc folder ready, `cd` into the aqueduct-components folder and do `yalc publish --store-folder ~/docker/volumes/yalc`. This will publish your local aqueduct-components code to yalc's local registry.
6. `cd` to this app's repository and run `docker-compose run shell` to get a shell within the development Docker container.  Once you're there, run `yalc link --store-folder /yalc aqueduct-components`, which will link `node_modules/aqueduct-components` to the version in yalc's registry.
7. `exit` out of the shell and run `docker-compose up web` to build and run the app and ensure that this works as normal.


### Making Changes

You will have to re-publish aqueduct-components with yalc every time that you make changes to it.  Follow these steps to re-publish and update the version in the development container:

1. `cd` to the aqueduct-components directory (if not there already) and run `yalc publish --store-folder ~/docker/volumes/yalc` to publish the updated version to the yalc registry
2. `cd` to the app directory and run `docker-compose run shell` to get a shell inside the container
3. Run `yalc update --store-folder /yalc` to update to the version to the one in the yalc registry


### Submitting Changes

Once you've finished making whatever changes you need to aqueduct-components, make a PR at [aqueduct-components](https://github.com/greenriver/aqueduct-components).  You will also need to make a PR in the app repository if any changes were required for the application code. Follow the recommended contribution process for the app, but make sure to indicate that the changes rely on changes in aqueduct-components as well.


## Aqueduct Repo Directory

- [Aqueduct Water Risk Atlas](https://www.wri.org/applications/aqueduct/water-risk-atlas) - https://github.com/greenriver/aqueduct-water-risk
- [Aqueduct Country Rankings](https://www.wri.org/applications/aqueduct/country-rankings) - https://github.com/greenriver/aqueduct-countries-ranking
- [Aqueduct Food](https://www.wri.org/applications/aqueduct/food/#/) - https://github.com/greenriver/aqueduct-food
- [Aqueduct Floods](https://www.wri.org/applications/aqueduct/floods/) - https://github.com/greenriver/aqueduct-flood
- [Aqueduct Components](https://greenriver.github.io/aqueduct-components/) - https://github.com/greenriver/aqueduct-components
