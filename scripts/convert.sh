#!/bin/bash

# DIRS=("tokensAbi") # Add more subfolders as needed
# DIRS=("borrowPoolsAbi" "farm" "gm" "lp" "stake" "tokensAbi" "zeroXSwap")

convert() {
  DIR="src/abis"

  for file in "$DIR"/*; do
    [ -f "$file" ] || continue

    filename=$(basename -- "$file")
    ext="${file##*.}"

    tsfile="${file%.*}.ts"

    # if is .ts file -> move to .js file first
    if [[ "$ext" == "ts" ]]; then
      mv "$file" "${file%.*}.js"
      file="${file%.*}.js"
    fi

    # Check if the file contains an array (line with just ] or ];)
    if grep -qE '^\] *;? *$' "$file"; then
      awk '
        BEGIN {}
        {
          if ($0 ~ /^] *;? *$/) {
            print "] as const;"
          } else {
            print
          }
        }
      ' "$file" >"$tsfile"
    fi

    # If original was .js, remove it after conversion
  done

  rm "$DIR"/*.js
}

# for DIR in "${DIRS[@]}"; do
# done
convert "$DIR"
