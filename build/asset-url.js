#!/usr/bin/env node
'use strict'

const fetch = require('node-fetch')

const githubToken = process.env.GITHUB_TOKEN || null

const arch = process.argv[2]
let pattern = null
if (arch === 'linux') pattern = /^svgcleaner_linux_x86_64_[\d.]+\.tar\.gz$/i
else if (arch === 'macOS') pattern = /^svgcleaner_macos_[\d.]+\.zip$/i
else if (arch === 'windows') pattern = /^svgcleaner_win32_[\d.]+\.zip$/i
else throw new Error('invalid arch parameter')

const fetchJSON = (url) => {
	if (githubToken) {
		console.error(`Using GitHub token ${githubToken.slice(0, 10)}….`)
	}
	return fetch(url, {
		redirect: 'follow',
		header: githubToken ? {Authorization: 'token ' + githubToken} : {}
	})
	.then((res) => {
		if (!res.ok) {
			const err = new Error(res.statusText)
			err.statusCode = res.status
			throw err
		}
		return res.json()
	})
}

fetchJSON(`https://api.github.com/repos/RazrFalcon/svgcleaner/releases/latest`)
.then((r) => {
	if (!Array.isArray(r.assets) || r.assets.length === 0) {
		throw new Error(r.tag_name + ' release has no assets.')
	}

	const asset = r.assets.find(a => pattern.test(a.name))
	const url = asset && asset.browser_download_url || null
	process.stdout.write(url)
})
.catch((err) => {
	console.error(err)
	process.exit(1)
})
