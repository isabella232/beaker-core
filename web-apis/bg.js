const globals = require('../globals')

const SECURE_ORIGIN_REGEX = /^(beaker:|dat:|https:|http:\/\/localhost(\/|:))/i

// internal manifests
const loggerManifest = require('./manifests/internal/logger')
const archivesManifest = require('./manifests/internal/archives')
const beakerBrowserManifest = require('./manifests/internal/browser')
const downloadsManifest = require('./manifests/internal/downloads')
const historyManifest = require('./manifests/internal/history')
const sitedataManifest = require('./manifests/internal/sitedata')
const watchlistManifest = require('./manifests/internal/watchlist')
const crawlerManifest = require('./manifests/internal/crawler')
const usersManifest = require('./manifests/internal/users')

// internal apis
const loggerAPI = require('../logger').WEBAPI
const archivesAPI = require('./bg/archives')
const historyAPI = require('./bg/history')
const sitedataAPI = require('../dbs/sitedata').WEBAPI
const watchlistAPI = require('./bg/watchlist')
const crawlerAPI = require('../uwg').WEBAPI
const usersAPI = require('./bg/users')

// external manifests
const navigatorManifest = require('./manifests/external/navigator')
const navigatorSessionManifest = require('./manifests/external/navigator-session')
const navigatorFilesystemManifest = require('./manifests/external/navigator-filesystem')
const datArchiveManifest = require('./manifests/external/dat-archive')
const spellCheckerManifest = require('./manifests/external/spell-checker')
const bookmarksManifest = require('./manifests/external/unwalled-garden-bookmarks')
const searchManifest = require('./manifests/external/search')
const commentsManifest = require('./manifests/external/unwalled-garden-comments')
const followsManifest = require('./manifests/external/unwalled-garden-follows')
const libraryManifest = require('./manifests/external/unwalled-garden-library')
const statusesManifest = require('./manifests/external/unwalled-garden-statuses')
const profilesManifest = require('./manifests/external/unwalled-garden-profiles')
const reactionsManifest = require('./manifests/external/unwalled-garden-reactions')
const tagsManifest = require('./manifests/external/unwalled-garden-tags')
const votesManifest = require('./manifests/external/unwalled-garden-votes')

// external apis
const navigatorAPI = require('./bg/navigator')
const navigatorSessionAPI = require('./bg/navigator-session')
const navigatorFilesystemAPI = require('./bg/navigator-filesystem')
const datArchiveAPI = require('./bg/dat-archive')
const spellCheckerAPI = require('./bg/spell-checker')
const bookmarksAPI = require('./bg/unwalled-garden-bookmarks')
const searchAPI = require('./bg/search')
const commentsAPI = require('./bg/unwalled-garden-comments')
const followsAPI = require('./bg/unwalled-garden-follows')
const libraryAPI = require('./bg/unwalled-garden-library')
const statusesAPI = require('./bg/unwalled-garden-statuses')
const profilesAPI = require('./bg/unwalled-garden-profiles')
const reactionsAPI = require('./bg/unwalled-garden-reactions')
const tagsAPI = require('./bg/unwalled-garden-tags')
const votesAPI = require('./bg/unwalled-garden-votes')

// experimental manifests
const experimentalCapturePageManifest = require('./manifests/external/experimental/capture-page')
const experimentalDatPeersManifest = require('./manifests/external/experimental/dat-peers')
const experimentalGlobalFetchManifest = require('./manifests/external/experimental/global-fetch')

// experimental apis
const experimentalCapturePageAPI = require('./bg/experimental/capture-page')
const experimentalDatPeersAPI = require('./bg/experimental/dat-peers')
const experimentalGlobalFetchAPI = require('./bg/experimental/global-fetch')

// exported api
// =

exports.setup = function () {
  // internal apis
  globals.rpcAPI.exportAPI('logger', loggerManifest, loggerAPI, internalOnly)
  globals.rpcAPI.exportAPI('archives', archivesManifest, archivesAPI, internalOnly)
  globals.rpcAPI.exportAPI('beaker-browser', beakerBrowserManifest, globals.browserWebAPI, internalOnly)
  globals.rpcAPI.exportAPI('downloads', downloadsManifest, globals.downloadsWebAPI, internalOnly)
  globals.rpcAPI.exportAPI('history', historyManifest, historyAPI, internalOnly)
  globals.rpcAPI.exportAPI('sitedata', sitedataManifest, sitedataAPI, internalOnly)
  globals.rpcAPI.exportAPI('watchlist', watchlistManifest, watchlistAPI, internalOnly)
  globals.rpcAPI.exportAPI('crawler', crawlerManifest, crawlerAPI, internalOnly)
  globals.rpcAPI.exportAPI('users', usersManifest, usersAPI, internalOnly)

  // external apis
  globals.rpcAPI.exportAPI('navigator', navigatorManifest, navigatorAPI, secureOnly)
  globals.rpcAPI.exportAPI('navigator-session', navigatorSessionManifest, navigatorSessionAPI, secureOnly)
  globals.rpcAPI.exportAPI('navigator-filesystem', navigatorFilesystemManifest, navigatorFilesystemAPI, secureOnly)
  globals.rpcAPI.exportAPI('dat-archive', datArchiveManifest, datArchiveAPI, secureOnly)
  globals.rpcAPI.exportAPI('spell-checker', spellCheckerManifest, spellCheckerAPI)
  globals.rpcAPI.exportAPI('unwalled-garden-bookmarks', bookmarksManifest, bookmarksAPI, secureOnly)
  globals.rpcAPI.exportAPI('search', searchManifest, searchAPI, secureOnly)
  globals.rpcAPI.exportAPI('unwalled-garden-comments', commentsManifest, commentsAPI, secureOnly)
  globals.rpcAPI.exportAPI('unwalled-garden-follows', followsManifest, followsAPI, secureOnly)
  globals.rpcAPI.exportAPI('unwalled-garden-library', libraryManifest, libraryAPI, secureOnly)
  globals.rpcAPI.exportAPI('unwalled-garden-statuses', statusesManifest, statusesAPI, secureOnly)
  globals.rpcAPI.exportAPI('unwalled-garden-profiles', profilesManifest, profilesAPI, secureOnly)
  globals.rpcAPI.exportAPI('unwalled-garden-reactions', reactionsManifest, reactionsAPI, secureOnly)
  globals.rpcAPI.exportAPI('unwalled-garden-tags', tagsManifest, tagsAPI, secureOnly)
  globals.rpcAPI.exportAPI('unwalled-garden-votes', votesManifest, votesAPI, secureOnly)

  // experimental apis
  globals.rpcAPI.exportAPI('experimental-capture-page', experimentalCapturePageManifest, experimentalCapturePageAPI, secureOnly)
  globals.rpcAPI.exportAPI('experimental-dat-peers', experimentalDatPeersManifest, experimentalDatPeersAPI, secureOnly)
  globals.rpcAPI.exportAPI('experimental-global-fetch', experimentalGlobalFetchManifest, experimentalGlobalFetchAPI, secureOnly)
}

function internalOnly (event, methodName, args) {
  return (event && event.sender && event.sender.getURL().startsWith('beaker:'))
}

function secureOnly (event, methodName, args) {
  if (!(event && event.sender)) {
    return false
  }
  var url = event.sender.getURL()
  return SECURE_ORIGIN_REGEX.test(url)
}
