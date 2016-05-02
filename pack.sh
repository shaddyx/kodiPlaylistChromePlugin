#!/bin/bash

PLUGIN_NAME=kodiPlaylistChromePlugin
P=../
OUTPUT_FILE=$P$PLUGIN_NAME.zip

rm $OUTPUT_FILE
zip -r $OUTPUT_FILE *
echo $OUTPUT_FILE