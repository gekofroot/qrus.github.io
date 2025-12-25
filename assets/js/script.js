
let shader = document.getElementById('shader')
let contentFieldTitle = document.getElementById('content-field-title')
let contentField = document.getElementById('content-field')
let assembleQuery = document.getElementById('assemble-query')
let stagingField = document.getElementById('staging-field')
let clear = document.getElementById('clear')
let submit = document.getElementById('submit')
let select = document.getElementById('select')
let search = document.getElementById('search')
let searchFieldIndicator = document.getElementById('search-field-indicator')
let searchString = document.getElementById('search-string')
let currentUrl = 'https://www.google.com/search?q='


let windowWidthValue = 50
window.addEventListener('load', () => {
  if (window.outerWidth > 1080) {
    windowWidthValue = 50
  } else if (window.outerWidth < 1080) {
    windowWidthValue = 100
  }
})

window.addEventListener('resize', () => {
  if (window.outerWidth > 1080) {
    windowWidthValue = 50
  } else if (window.outerWidth < 1080) {
    windowWidthValue = 100
  }
  let intervalCount = 0
  let selectInterval = setInterval(() => {
    intervalCount += 10
    contentField.style.width = `${intervalCount}%`
    if (intervalCount === windowWidthValue) {
      setTimeout(() => {
	contentFieldTitle.style.opacity = '100'
	assembleQuery.style.opacity = '100'
	stagingField.style.opacity = '100'
      }, 420)
      clearInterval(selectInterval)
    }
  }, 1)
})

let toolTipList = [
  'base', 'define', 'cache', 'filetype', 'ext', 'site',
  'related', 'intitle', 'allintitle', 'inurl', 'allinurl',
  'intext', 'allintext', 'weather', 'stocks', 'map',
  'movie', 'in', 'source', 'before', 'after',
  'loc', 'location'
]

let searchOpList = [
  '', 'define', 'cache', 'filetype', 'ext', 'site',
  'related', 'intitle', 'allintitle', 'inurl', 'allinurl',
  'intext', 'allintext', 'weather', 'stocks', 'map',
  'movie', 'in', 'source', 'before', 'after',
  'loc', 'location'
]

for (let x = 0; x < toolTipList.length; x++) {
  let newNode = document.createElement('div')
  newNode.setAttribute('class', `assem-items tooltip-item`)
  newNode.setAttribute('id', `tooltip-item-${x}`)
  newNode.style.gridRow = `${x} + 1`
  newNode.style.gridColumn = '1'
  assembleQuery.appendChild(newNode)
}

for (let x = 0; x < toolTipList.length; x++) {
  document.getElementById(`tooltip-item-${x}`).innerText = toolTipList[x]
}

for (let x = 1; x <= searchOpList.length; x++) {
  let newNode = document.createElement('input')
  newNode.setAttribute('class', `assem-items query-item`)
  newNode.setAttribute('id', `query-item-${x}`)
  if (x === 20) {
    newNode.setAttribute('type', 'date')
    newNode.setAttribute('class', `assem-items query-item query-date-item`)
  } else if (x === 21) {
    newNode.setAttribute('type', 'date')
    newNode.setAttribute('class', `assem-items query-item query-date-item`)
  }
  newNode.style.gridRow = `${x}`
  newNode.style.gridColumn = '2/4'
  assembleQuery.appendChild(newNode)
}
let queryItems = document.getElementsByClassName('query-item')

submit.addEventListener('click', () => {
  shader.style.opacity = '0'
  setTimeout(() => {
    shader.style.display = 'none'
  }, 100)
  contentField.style.transition = '.2s'
  contentField.style.opacity = '0'
  contentFieldTitle.style.opacity = '0'
  assembleQuery.style.opacity = '0'
  stagingField.style.opacity = '0'
  setTimeout(() => {
    contentField.style.display = 'none'
    contentField.style.width = '0'
  }, 100)
  currentUrl = 'https://www.google.com/search?q='
  for (let x = 0; x < queryItems.length; x++) {
    if (x > 0) {
      if (queryItems[x].value != '') {
	currentUrl = currentUrl + `${searchOpList[x]}:${queryItems[x].value.split(' ').join('+')}+`
      }
    } else {
      if (queryItems[x].value.length === 0) {
	currentUrl = currentUrl + `${queryItems[x].value.split(' ').join('+')}`
      } else {
	currentUrl = currentUrl + `${queryItems[x].value.split(' ').join('+')}+`
      }
    }
  }
  currentUrl = currentUrl.slice(0, -1)
  let activeInput = 0
  for (let x = 0; x < queryItems.length; x++) {
    if (queryItems[x].value != '') {
      activeInput = 1
    }
  }
  if (activeInput === 1) {
    searchFieldIndicator.style.background = 'var(--indicator-active)'
  } else {
    searchFieldIndicator.style.background = 'var(--indicator-inactive)'
  }
})

select.addEventListener('click', () => {
  shader.style.display = 'flex'
  setTimeout(() => {
    shader.style.opacity = '100'
  }, 100)
  contentField.style.transition = '.5s'
  contentField.style.display = 'flex'
  contentField.style.opacity = '100'
  let intervalCount = 0
  let selectInterval = setInterval(() => {
    intervalCount += 10
    contentField.style.width = `${intervalCount}%`
    if (intervalCount === windowWidthValue) {
      setTimeout(() => {
	contentFieldTitle.style.opacity = '100'
	assembleQuery.style.opacity = '100'
	stagingField.style.opacity = '100'
      }, 420)
      clearInterval(selectInterval)
    }
  }, 1)
})

search.addEventListener('click', () => {
  searchString.setAttribute('href', `${currentUrl}`)
  searchString.click()
})

clear.addEventListener('click', () => {
  for (let x = 0; x < queryItems.length; x++) {
    queryItems[x].value = ''
  }
})

