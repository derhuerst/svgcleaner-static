'use strict'

const os = require('os')
const getArch = require('arch')
const path = require('path')

const platform = os.platform()
if (platform !== 'linux' && platform !== 'darwin' && platform !== 'win32') {
	console.error(`Unsupported platform ${platform}.`)
	process.exit(1)
}

const arch = getArch()
if (arch !== 'x64') {
	console.error(`Unsupported architecture ${arch}.`)
	process.exit(1)
}

const svgcleanerPath = path.join(
	__dirname,
	'bin',
	platform,
	arch,
	platform === 'win32' ? 'svgcleaner.exe' : 'svgcleaner'
)
module.exports = svgcleanerPath
