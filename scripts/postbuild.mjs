import rss from './rss.mjs'

async function postbuild() {
  await rss()
}

postbuild()
