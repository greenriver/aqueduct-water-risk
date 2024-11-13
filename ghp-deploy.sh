git checkout gh-pages
git reset --hard HEAD~1
mv  dist/ docs/
git add docs/
git commit -m "inital commit"
git push --force
git checkout -