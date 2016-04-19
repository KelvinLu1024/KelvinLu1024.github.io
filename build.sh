#!/usr/bin/bash
n=`grep -n '<!--markdown-->' template.html | sed -r 's/:.*//'`
from=$1
to=${from%.*}.html
head -n $(($n-1)) template.html > $to
markdown $from >> $to
tail -n +$(($n+1)) template.html >> $to
