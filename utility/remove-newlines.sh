#!/usr/bin/env sh


echo `tr -d '\n' < "$1"` > "$1"

