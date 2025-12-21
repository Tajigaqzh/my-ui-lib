#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const pkgDir = path.resolve(__dirname, '..')
const pkgPath = path.join(pkgDir, 'package.json')

function getComponents() {
  return fs.readdirSync(pkgDir).filter((name) => {
    const sub = path.join(pkgDir, name)
    try {
      return fs.statSync(sub).isDirectory() && fs.existsSync(path.join(sub, 'index.ts'))
    } catch (e) {
      return false
    }
  })
}

function generateExports(pkg) {
  const comps = getComponents()

  const outExports = {}

  // keep root export if present
  if (pkg.exports && pkg.exports['.']) {
    outExports['.'] = pkg.exports['.']
  } else {
    // fallback to main/module/types (refer to package-local dist)
    outExports['.'] = {
      types: pkg.types || './dist/index.d.ts',
      import: pkg.module || './dist/index.es.js',
      require: pkg.main || './dist/index.cjs.js'
    }
  }

  comps.forEach((name) => {
    outExports[`./${name}`] = {
      types: `./dist/${name}/index.d.ts`,
      import: `./dist/${name}/index.es.js`,
      require: `./dist/${name}/index.cjs.js`
    }
  })

  return outExports
}

function main() {
  const pkgRaw = fs.readFileSync(pkgPath, 'utf8')
  const pkg = JSON.parse(pkgRaw)

  const newExports = generateExports(pkg)
  pkg.exports = newExports

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
  console.log('Updated exports in', pkgPath)
}

main()
