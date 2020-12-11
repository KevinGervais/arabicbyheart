var obfuscator = require('js-obfuscator')
var fs = require('fs')
var rimraf = require('rimraf')
var ncp = require('ncp').ncp
const {
  version: macAppVersion
} = require('../desktop/package.json')

const {
  version: mobileAppVersion
} = require('../mobile/package.json')

if (process.argv.length > 2 && ['desktop', "web", "mobile"].includes(process.argv[2])) {
  process.env.platform = process.argv[2]
}

async function ereaseFile(path) {
  console.info(`Erasing folders and files in ${path}`)
  return new Promise((resolve, reject) => {
    rimraf(path, function (err) {
      if (err) reject(err)
      else resolve()
    })
  })
}

async function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, str) => {
      if (err) reject(err)
      else resolve(str)
    })
  })
}

async function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf-8', (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

async function obfuscate(path) {
  console.info(`obfuscate file ${path}`)
  const fileContent = await readFile(path)
  const obfuscated = await obfuscator(fileContent)
  await writeFile(path, obfuscated)
}

async function replaceFileContent(path, from, to) {
  console.info(`Replace file content from ${from} to ${to}`)
  let cssFileContent = await readFile(path)
  cssFileContent = cssFileContent.split(from).join(to)
  await writeFile(path, cssFileContent)
}

async function copyFiles(from, to) {
  console.info(`Copy files from ${from} to ${to}`)
  return new Promise((resolve, reject) => {
    ncp(from, to, function (err) {
      if (err) reject(err)
      else resolve()
    })
  })
}

async function getFileList(path) {
  console.info(`get files in ${path}`)
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err)
      else resolve(files)
    })
  })
}

async function postBuild() {
  await ereaseFile('./build-temp')
  await copyFiles('./build', './build-temp')
  const jsFileList = await getFileList('./build-temp/static/js')
  await jsFileList.forEach(async (fileName) => {
    if (fileName.endsWith('.map') || fileName.startsWith('runtime') || fileName.endsWith('.txt')) {
      await ereaseFile(`./build-temp/static/js/${fileName}`)
    }
  })

  const mainJsFile = jsFileList.find((str) => str.startsWith('main'))
  if (process.env.platform === 'windows') {
    await replaceFileContent(`./build-temp/static/js/${mainJsFile}`, 'appVersion:""', `appVersion:"${windowsAppVersion}"`)
  } else if (process.env.platform === 'mac' || process.env.platform === 'web') {
    await replaceFileContent(`./build-temp/static/js/${mainJsFile}`, 'appVersion:""', `appVersion:"${macAppVersion}"`)
  } else if (process.env.platform === 'mobile') {
    await replaceFileContent(`./build-temp/static/js/${mainJsFile}`, 'appVersion:""', `appVersion:"${mobileAppVersion}"`)
  }
  await obfuscate(`./build-temp/static/js/${mainJsFile}`)

  const cssFileList = await getFileList('./build-temp/static/css')
  await cssFileList.forEach(async (fileName) => {
    if (fileName.endsWith('.map')) {
      await ereaseFile(`./build-temp/static/css/${fileName}`)
    } else if (fileName.startsWith('main')) {
      await replaceFileContent(`./build-temp/static/css/${fileName}`, 'url(/static/media/', 'url(../media/')
    }
  })

  await replaceFileContent('./build-temp/index.html', 'href="/', 'href="./')
  await replaceFileContent('./build-temp/index.html', 'src="/', 'src="./')
  if (process.env.platform === 'mac') {
    await ereaseFile('../mac/build/static')
    await ereaseFile('../mac/build/images')
    await ereaseFile('../mac/build/index.html')
    await copyFiles('./build-temp/static', '../mac/build/static')
    await copyFiles('./build-temp/images', '../mac/build/images')
    await copyFiles('./build-temp/index.html', '../mac/build/index.html')
  } else if (process.env.platform === 'windows') {
    await ereaseFile('../windows/static')
    await ereaseFile('../windows/images')
    await ereaseFile('../windows/index.html')
    await copyFiles('./build-temp/static', '../windows/static')
    await copyFiles('./build-temp/images', '../windows/images')
    await copyFiles('./build-temp/index.html', '../windows/index.html')
    await replaceFileContent('../windows/index.html', '<body>', '<body><script src="./titlebar.js"></script>')
  } else if (process.env.platform === 'web') {
    await ereaseFile('../../resolve-me.io/appBuild')
    await copyFiles('./build-temp', '../../resolve-me.io/appBuild')
  } else if (process.env.platform === 'mobile') {
    await ereaseFile('../mobile/www')
    await copyFiles('./build-temp', '../mobile/www')
    await replaceFileContent('../mobile/www/index.html', '</body>', '<script src="cordova.js"></script></body>')
  }
  await ereaseFile('./build-temp')
}
postBuild()