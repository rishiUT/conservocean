#!/usr/bin/env bash
OFFSET=0
OUT="{}"

while :
do
	OUT=$(python scrape.py $OFFSET "$OUT" 2>&1)
	echo $OUT
	OFFSET=$(($OFFSET + 100))
	if [ $OFFSET == 34400 ]
	then
		break
	fi
done
python scrape.py $OFFSET $OUT

