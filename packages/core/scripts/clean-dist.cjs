#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const distDir = path.resolve(__dirname, '..', '..', '..', 'dist', 'core')
try {
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true })
    console.log('Removed', distDir)
  } else {
    console.log('Nothing to remove at', distDir)
  }
} catch (err) {
  console.error('Failed to remove', distDir, err)
  process.exit(1)
}
