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


## Aqueduct Repo Directory

- [Aqueduct Water Risk Atlas](https://www.wri.org/applications/aqueduct/water-risk-atlas) - https://github.com/greenriver/aqueduct-water-risk
- [Aqueduct Country Rankings](https://www.wri.org/applications/aqueduct/country-rankings) - https://github.com/greenriver/aqueduct-countries-ranking
- [Aqueduct Food](https://www.wri.org/applications/aqueduct/food/#/) - https://github.com/greenriver/aqueduct-food
- [Aqueduct Floods](https://www.wri.org/applications/aqueduct/floods/) - https://github.com/greenriver/aqueduct-flood
- [Aqueduct Components](https://greenriver.github.io/aqueduct-components/) - https://github.com/greenriver/aqueduct-components
