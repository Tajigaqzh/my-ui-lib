#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const src = path.resolve(__dirname, '..', '..', '..', 'dist', 'core')
const dest = path.resolve(__dirname, '..', 'dist')

try {
  if (!fs.existsSync(src)) {
    console.error('Source dist not found:', src)
    process.exit(1)
  }
  // ensure dest exists
  fs.rmSync(dest, { recursive: true, force: true })
  fs.mkdirSync(dest, { recursive: true })

  // copy files recursively
  const copyRecursive = (s, d) => {
    for (const name of fs.readdirSync(s)) {
      const sp = path.join(s, name)
      const dp = path.join(d, name)
      const stat = fs.statSync(sp)
      if (stat.isDirectory()) {
        fs.mkdirSync(dp, { recursive: true })
        copyRecursive(sp, dp)
      } else {
        fs.copyFileSync(sp, dp)
      }
    }
  }

  copyRecursive(src, dest)
  console.log('Copied', src, 'to', dest)
} catch (err) {
  console.error('Failed to copy dist:', err)
  process.exit(1)
}
