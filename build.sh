cd src
zip ../bob-plugin-simpletex-v.bobplugin.zip *.js *.json *.png
timestamp=$(date +%s%N)
timestamp=${timestamp:0:10}${timestamp:13:3}
echo $timestamp
cd ..
shasum -a 256 bob-plugin-simpletex-v.bobplugin
