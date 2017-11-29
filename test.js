'use strict'

const test = require('tape')
const fs = require('fs')

const svgcleanerPath = require('.')

test('executable should exist', (t) => {
	const stats = fs.statSync(svgcleanerPath)
	t.ok(stats.isFile())
	t.end()
})
