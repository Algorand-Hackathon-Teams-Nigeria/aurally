#!/bin/bash

cd /home/emmylem55/dev/aurally/aurally/public/images || exit

for file in Mask_group*.png; do
    convert "$file" "${file%.png}.webp"
done