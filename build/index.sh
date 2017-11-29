#!/bin/sh
cd $(dirname $0)

download () {
	curl -L -# -A 'https://github.com/derhuerst/svgcleaner-static' -o $2 $1
}

tar=$(command -v gtar)
if [ $? -ne 0 ]; then
	tar=$(command -v tar)
fi

echo 'downloading linux asset'
download $(./asset-url.js linux) linux.tar.gz
$tar -x -C ../bin/linux/x64 --strip-components 1 -f linux.tar.gz --wildcards '*/svgcleaner'

echo 'downloading macOS asset'
download $(./asset-url.js macOS) macOS.zip
unzip -o -d . -j macOS.zip '**/MacOS/svgcleaner-cli'
mv svgcleaner-cli ../bin/darwin/x64/svgcleaner

# todo: windows
# see https://github.com/RazrFalcon/svgcleaner/issues/99#issuecomment-347906481
