cd src
zip ../bob-plugin-simpletex-v.bobplugin.zip *.js *.json *.png
timestamp=$(date +%s)
echo "$timestamp"
cd ..
shasum -a 256 bob-plugin-simpletex-v.bobplugin
