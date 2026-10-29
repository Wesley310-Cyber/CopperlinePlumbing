#!/bin/bash
# Render scenes in parallel, then join them into one silent MP4.
cd "$(dirname "$0")"
mkdir -p out
ls scene-*.html | sed 's/scene-\(.*\)\.html/\1/' | sort -n | xargs -P 4 -I{} node render.mjs scene-{}.html out/scene-{}.mp4 30
: > out/list.txt
for n in $(ls scene-*.html | sed 's/scene-\(.*\)\.html/\1/' | sort -n); do echo "file 'scene-$n.mp4'" >> out/list.txt; done
ffmpeg -loglevel error -y -f concat -safe 0 -i out/list.txt -c copy out/viral-psychology-full.mp4
ffprobe -v error -show_entries format=duration -of default=nw=1 out/viral-psychology-full.mp4
