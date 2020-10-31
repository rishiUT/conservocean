#!/usr/bin/env bash
OFFSET=20200
OUT="{}"
if [ $OFFSET != 0 ]
then
    OUT=$(<waterdict.txt)
    echo $OUT
fi

while :
do
    echo $OFFSET
    OUT=$(python scrape.py $OFFSET "$OUT" 2>&1)
    echo "$OUT" > "waterdict.txt"
    OFFSET=$(($OFFSET + 100))
    if [ $OFFSET == 34400 ]
    then
        break
    fi
done
python scrape.py $OFFSET $OUT
