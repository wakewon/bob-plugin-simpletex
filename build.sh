#!/bin/bash

# 检查info.json文件是否存在
if [ ! -f "src/info.json" ]; then
    echo "info.json 文件不存在"
    exit 1
fi

# 从info.json文件中提取version值
version=$(jq -r '.version' src/info.json)

if [ -z "$version" ]; then
    echo "未找到 version 值"
    exit 1
fi

# 进入src目录
cd src

# 生成插件zip文件
zip ../bob-plugin-simpletex-v$version.bobplugin.zip *.js *.json *.png

# 生成时间戳
timestamp=$(($(date +%s)*1000))

# 返回上一级目录
cd ..

# 计算sha256值
sha256=$(shasum -a 256 bob-plugin-simpletex-v$version.bobplugin.zip | awk '{print $1}')

# 更新appcast.json中与提取的版本号相匹配的项，如果不存在则添加新项
jq --arg version "$version" --arg sha256 "$sha256" --argjson timestamp $timestamp '
    if (.versions | map(.version) | index($version)) then
        .versions |= map(if .version == $version then .sha256 = $sha256 | .timestamp = $timestamp else . end)
    else
        .versions = [{"version": $version, "desc": "更新日志","sha256": $sha256, "url": "https://github.com/wakewon/bob-plugin-simpletex/releases/download/v\($version)/bob-plugin-simpletex-v\($version).bobplugin.zip", "minBobVersion": "0.5.0","timestamp": $timestamp}] + .versions
    end
' appcast.json > tmp.json && mv tmp.json appcast.json

echo "更新成功"
