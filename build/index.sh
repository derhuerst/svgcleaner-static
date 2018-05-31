#!/bin/sh
set +e
cd $(dirname $0)

download () {
	curl -L -# -A 'https://github.com/derhuerst/svgcleaner-static' -o $2 $1
}

tar=$(command -v gtar)
if [ $? -ne 0 ]; then
	tar=$(command -v tar)
fi

echo 'downloading linux asset'
linuxUrl=$(node asset-url.js linux)
download $linuxUrl linux.tar.gz
$tar -xz -C ../bin/linux/x64 -f linux.tar.gz svgcleaner

echo 'downloading macOS asset'
macOSUrl=$(node asset-url.js macOS)
download $macOSUrl macOS.zip
unzip -o -d . -j macOS.zip svgcleaner
mv svgcleaner ../bin/darwin/x64/svgcleaner

echo 'downloading Windows asset'
windowsUrl=$(node asset-url.js windows)
download $windowsUrl windows.zip
unzip -o -d ../bin/win32/x64 -j windows.zip svgcleaner.exe
