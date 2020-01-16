const { execSync } = require('child_process')

const rollup = async function() {
  process.env.NODE_ENV = 'test'
  execSync('yarn rollup -c', {
    stdio: 'inherit',
  })
}

require('jsdom-global')()
rollup()
