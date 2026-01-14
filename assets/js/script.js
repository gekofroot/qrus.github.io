
// variables
let shader = document.getElementById('shader')
let contentFieldTitles = document.getElementsByClassName('h2-title')
let contentField = document.getElementById('content-field')
let assembleQuery = document.getElementById('assemble-query')
let stagingField = document.getElementById('staging-field')
let clear = document.getElementById('clear')
let submit = document.getElementById('submit')
let select = document.getElementById('select')
let search = document.getElementById('search')
let searchFieldIndicator = document.getElementById('search-field-indicator')
let searchString = document.getElementById('search-string')
let activeOperators = document.getElementById('active-operators')
let selectAllModules = document.getElementById('select-all-modules')
let deselectAllModules = document.getElementById('deselect-all-modules')
let currentUrl = 'https://www.google.com/search?q='
let panelField = document.getElementById('panel-field')
let panelToggle = document.getElementById('panel-toggle')
let toggleDivs = panelToggle.children
let toolTipItems = ''
let queryItems = ''
let panelToggleValue = 0


// stored values
let storedFlagToggles = localStorage.getItem('flag-toggles')

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

let flagToggles = [
]

let invalidIndexValues = [
  '-'
]

if (storedFlagToggles) {

  // flags available
  flagToggles = storedFlagToggles
  flagToggles = flagToggles.split(',')
  for (let x = 0; x < flagToggles.length; x++) {
    flagToggles[x] = Number(flagToggles[x])
  }

  // build modified operator selection field
  for (let x = 0; x < flagToggles.length; x++) {

    // build module
    let operatorModule = document.createElement('div')
    operatorModule.setAttribute('class', `operator-module`)
    operatorModule.setAttribute('id', `operator-module-${x}`)
    operatorModule.style.gridRow = `${x} + 1`
    operatorModule.style.gridColumn = '1'

    // build module inputs
    let operatorFlag = document.createElement('input')
    operatorFlag.setAttribute('type', `button`)
    operatorFlag.setAttribute('class', `operator-flag`)
    operatorFlag.setAttribute('id', `operator-flag-${x}`)
    operatorFlag.style.gridRow = `1`
    operatorFlag.style.gridColumn = '1 / 2'
    operatorModule.appendChild(operatorFlag)
    if (flagToggles[x] === 1) {
      operatorFlag.style.background = 'var(--module-active)'
    } else {
      operatorFlag.style.background = 'var(--module-inactive)'
    }

    // build module titles
    let operatorTitle = document.createElement('div')
    operatorTitle.innerText = toolTipList[x]
    operatorTitle.setAttribute('class', `operator-title`)
    operatorTitle.setAttribute('id', `operator-title-${x}`)
    operatorTitle.style.gridRow = `1`
    operatorTitle.style.gridColumn = '2 / 4'
    operatorModule.appendChild(operatorTitle)

    // establish modified operator selection field
    activeOperators.appendChild(operatorModule)
  }

  // build modified query assembly field
  for (let x = 0; x < flagToggles.length; x++) {
    if (flagToggles[x] === 1) {

      //build tooltip titles
      let newNode = document.createElement('div')
      newNode.innerText = toolTipList[x]
      newNode.setAttribute('class', `assem-items tooltip-item`)
      newNode.setAttribute('id', `tooltip-item-${x}`)
      newNode.style.gridRow = `${x} + 1`
      newNode.style.gridColumn = '1'
      assembleQuery.appendChild(newNode)

      // build inputs
      newNodeB = document.createElement('input')
      newNodeB.setAttribute('class', `assem-items query-item`)
      newNodeB.setAttribute('id', `query-item-${x}`)

      // date field customs
      if (x === 19) {
	newNodeB.setAttribute('type', 'date')
	newNodeB.setAttribute('class', `assem-items query-item query-date-item`)
      } else if (x === 20) {
	newNodeB.setAttribute('type', 'date')
	newNodeB.setAttribute('class', `assem-items query-item query-date-item`)
      }
      newNodeB.style.gridRow = `${x} + 1`
      newNodeB.style.gridColumn = '2 / 4'
      assembleQuery.appendChild(newNodeB)
    }
  }
  toolTipItems = document.getElementsByClassName('tooltip-item')
  queryItems = document.getElementsByClassName('query-item')
} else {

  // initialise flags
  for (let x = 0; x < searchOpList.length; x++) {
    flagToggles.push(1)
  }
  localStorage.setItem('flag-toggles', flagToggles)

  // initialise operator selection field
  for (let x = 0; x < searchOpList.length; x++) {

    // build module
    let operatorModule = document.createElement('div')
    operatorModule.setAttribute('class', `operator-module`)
    operatorModule.setAttribute('id', `operator-module-${x}`)
    operatorModule.style.gridRow = `${x} + 1`
    operatorModule.style.gridColumn = '1'

    // build module inputs
    let operatorFlag = document.createElement('input')
    operatorFlag.setAttribute('type', `button`)
    operatorFlag.setAttribute('class', `operator-flag`)
    operatorFlag.setAttribute('id', `operator-flag-${x}`)
    operatorFlag.style.gridRow = `1`
    operatorFlag.style.gridColumn = '1 / 2'
    operatorModule.appendChild(operatorFlag)

    // build module titles
    let operatorTitle = document.createElement('div')
    operatorTitle.innerText = toolTipList[x]
    operatorTitle.setAttribute('class', `operator-title`)
    operatorTitle.setAttribute('id', `operator-title-${x}`)
    operatorTitle.style.gridRow = `1`
    operatorTitle.style.gridColumn = '2 / 4'
    operatorModule.appendChild(operatorTitle)

    // establish operator field
    activeOperators.append(operatorModule)
  }

  // initialise query assembly field
  for (let x = 0; x < searchOpList.length; x++) {

    // build tooltip titles
    let newNode = document.createElement('div')
    newNode.innerText = toolTipList[x]
    newNode.setAttribute('class', `assem-items tooltip-item`)
    newNode.setAttribute('id', `tooltip-item-${x}`)
    newNode.style.gridRow = `${x} + 1`
    newNode.style.gridColumn = '1'
    assembleQuery.appendChild(newNode)

    // build inputs
    let newNodeB = document.createElement('input')
    newNodeB.setAttribute('class', `assem-items query-item`)
    newNodeB.setAttribute('id', `query-item-${x}`)

    // date field customs
    if (x === 19) {
      newNodeB.setAttribute('type', 'date')
      newNodeB.setAttribute('class', `assem-items query-item query-date-item`)
    } else if (x === 20) {
      newNodeB.setAttribute('type', 'date')
      newNodeB.setAttribute('class', `assem-items query-item query-date-item`)
    }
    newNodeB.style.gridRow = `${x} + 1`
    newNodeB.style.gridColumn = '2 / 4'
    assembleQuery.appendChild(newNodeB)
  }
  toolTipItems = document.getElementsByClassName('tooltip-item')
  queryItems = document.getElementsByClassName('query-item')
}
let operatorFlags = document.getElementsByClassName('operator-flag')

// media query on load
let windowWidthValue = 50
let intervalCountValue = 85
window.addEventListener('load', () => {
  if (window.outerWidth > 1080) {
    windowWidthValue = 50
    intervalCountValue = 85
  } else if (window.outerWidth < 1080) {
    windowWidthValue = 100
    intervalCountValue = 100
  }
})

// media query on resize
window.addEventListener('resize', () => {
  if (window.outerWidth > 1080) {
    windowWidthValue = 50
    intervalCountValue = 85
  } else if (window.outerWidth < 1080) {
    windowWidthValue = 100
    intervalCountValue = 100
  }

  // build query assembly field on resize
  let intervalCount = 0
  let selectInterval = setInterval(() => {
    intervalCount += 10
    contentField.style.width = `${intervalCount}%`
    if (intervalCount === windowWidthValue) {
      setTimeout(() => {
	setTimeout(() => {
	  for (let x = 0; x < contentFieldTitles.length; x++) {
	    contentFieldTitles[x].style.opacity = '100'
	  }
	}, 400)
	assembleQuery.style.opacity = '100'
	stagingField.style.opacity = '100'
      }, 420)
      clearInterval(selectInterval)
    }
  }, 1)
})

submit.addEventListener('click', () => {

  // fade query assembly field
  shader.style.opacity = '0'
  setTimeout(() => {
    shader.style.display = 'none'
  }, 100)
  contentField.style.transition = '.2s'
  contentField.style.opacity = '0'
  for (let x = 0; x < contentFieldTitles.length; x++) {
    contentFieldTitles[x].style.opacity = '0'
  }
  assembleQuery.style.opacity = '0'
  stagingField.style.opacity = '0'
  setTimeout(() => {
    contentField.style.display = 'none'
    contentField.style.width = '0'
  }, 100)

  // build url
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

  // slice plus
  currentUrl = currentUrl.slice(0, -1)
  
  // is query string greater than 0
  let activeInput = 0
  for (let x = 0; x < queryItems.length; x++) {
    if (queryItems[x].value != '') {
      activeInput = 1
    }
  }
  if (activeInput === 1) {

    // query string greater than 0
    searchFieldIndicator.style.background = 'var(--indicator-active)'
  } else {

    // query string 0
    searchFieldIndicator.style.background = 'var(--indicator-inactive)'
  }
})

// engage query assembly
select.addEventListener('click', () => {

  // fade shader
  shader.style.display = 'flex'
  setTimeout(() => {
    shader.style.opacity = '100'
  }, 100)

  // establish query assembly field
  contentField.style.transition = '.5s'
  contentField.style.display = 'flex'
  contentField.style.opacity = '100'
  let intervalCount = 0
  let selectInterval = setInterval(() => {
    intervalCount += 10
    contentField.style.width = `${intervalCount}%`
    if (intervalCount === windowWidthValue) {
      setTimeout(() => {
	setTimeout(() => {
	  for (let x = 0; x < contentFieldTitles.length; x++) {
	    contentFieldTitles[x].style.opacity = '100'
	  }
	}, 400)
	assembleQuery.style.opacity = '100'
	stagingField.style.opacity = '100'
      }, 420)
      clearInterval(selectInterval)
    }
  }, 1)
})

// engage url
search.addEventListener('click', () => {
  searchString.setAttribute('href', `${currentUrl}`)
  searchString.click()
})

// clear query inputs
clear.addEventListener('click', () => {
  for (let x = 0; x < queryItems.length; x++) {
    queryItems[x].value = ''
  }
})

activeOperators.addEventListener('click', () => {
  let eventTarget = event.target
  
  // element selectable
  if (eventTarget.className.includes('operator-flag')) {
    
    // build module indicese
    let flagToggleIndex = eventTarget.id.slice(-2)
    if (flagToggleIndex.includes(invalidIndexValues)) {
      flagToggleIndex = eventTarget.id.slice(-1)
    }
    if (flagToggles[flagToggleIndex] === 0) {

      // toggle module active
      flagToggles[flagToggleIndex] = 1

      // activate module
      eventTarget.style.background = 'var(--module-active)'
    } else {

      // deactivate module
      flagToggles[flagToggleIndex] = 0
      eventTarget.style.background = 'var(--module-inactive)'
    }
    localStorage.setItem('flag-toggles', flagToggles)
  }
})

// panel toggled
panelToggle.addEventListener('click', () => {
  if (panelToggleValue === 0) {
    for (let x = 0; x < contentFieldTitles.length; x++) {
      contentFieldTitles[x].style.opacity = '0'
    }

    // fade query assembly field
    contentField.style.transition = '.2s'
    contentField.style.opacity = '0'
    assembleQuery.style.opacity = '0'
    stagingField.style.opacity = '0'
    setTimeout(() => {
      contentField.style.display = 'none'
      contentField.style.width = '0'
    }, 100)

    // panel toggle engaged
    toggleDivs[0].style.transform = 'rotate(90deg) translateX(1em)'
    toggleDivs[1].style.width = '0'
    toggleDivs[1].style.opacity = '0'
    toggleDivs[2].style.transform = 'rotate(360deg) translateY(-1.2em)'
    for (let x = 0; x < toggleDivs.length; x++) {
      toggleDivs[x].style.background = 'var(--acnt-c)'
    }
    shader.style.display = 'flex'
    setTimeout(() => {
      shader.style.opacity = '100'
    }, 100)
    panelField.style.display = 'flex'
    setTimeout(() => {
      let intervalCount = 0
      let toggleInterval = setInterval(() => {
	if (intervalCount > intervalCountValue) {
	  settings.style.opacity = '100'
	    setTimeout(() => {
	    for (let x = 0; x < contentFieldTitles.length; x++) {
		contentFieldTitles[x].style.opacity = '100'
	      }
	    }, 400)
	  clearInterval(toggleInterval)
	} else {
	  panelField.style.height = `${intervalCount}%`
	  intervalCount += 5
	}
      }, 2)
    }, 7)
    panelToggleValue = 1
  } else if (panelToggleValue === 1) {

    // panel toggle disengaged
    toggleDivs[0].style.transform = 'rotate(0deg) translateX(0em)'
    toggleDivs[1].style.width = '70%'
    toggleDivs[1].style.opacity = '100'
    toggleDivs[2].style.transform = 'rotate(0deg) translateY(0em)'
    for (let x = 0; x < toggleDivs.length; x++) {
      toggleDivs[x].style.background = 'var(--acnt-a)'
    }
    shader.style.opacity = '0'
    setTimeout(() => {
      shader.style.display = 'none'
    }, 100)
    settings.style.opacity = '0'
    let intervalCount = 50
    let toggleInterval = setInterval(() => {
      if (intervalCount === 0) {
	for (let x = 0; x < contentFieldTitles.length; x++) {
	  contentFieldTitles[x].style.opacity = '0'
	}
	clearInterval(toggleInterval)
      } else {
	panelField.style.height = `${intervalCount}%`
	intervalCount -= 5
      }
    }, 2)
    setTimeout(() => {
      panelField.style.display = 'none'
    }, 500)

    // clear assembly query field
    while (assembleQuery.childNodes.length > 0) {
      assembleQuery.removeChild(assembleQuery.firstChild)
    }

    // append selected modules to query assembly
    for (let x = 0; x < flagToggles.length; x++) {
      if (flagToggles[x] === 1) {
	newNode = document.createElement('div')
	newNode.innerText = toolTipList[x]
	newNode.setAttribute('class', `assem-items tooltip-item`)
	newNode.setAttribute('id', `tooltip-item-${x}`)
	newNode.style.gridColumn = '1'
	assembleQuery.appendChild(newNode)
	newNodeB = document.createElement('input')
	newNodeB.setAttribute('class', `assem-items query-item`)
	newNodeB.setAttribute('id', `query-item-${x}`)

	// date field customs
	if (x === 19) {
	  newNodeB.setAttribute('type', 'date')
	  newNodeB.setAttribute('class', `assem-items query-item query-date-item`)
	} else if (x === 20) {
	  newNodeB.setAttribute('type', 'date')
	  newNodeB.setAttribute('class', `assem-items query-item query-date-item`)
	}
	newNodeB.style.gridColumn = '2 / 4'
	assembleQuery.appendChild(newNodeB)
      }
    }
    panelToggleValue = 0
  }
})

selectAllModules.addEventListener('click', () => {
  for (let x = 0; x < flagToggles.length; x++) {
    flagToggles[x] = 1
  }
  localStorage.setItem('flag-toggles', flagToggles)
  for (let x = 0; x < operatorFlags.length; x++) {
    operatorFlags[x].style.background = 'var(--module-active)'
  }
})

deselectAllModules.addEventListener('click', () => {
  for (let x = 0; x < flagToggles.length; x++) {
    flagToggles[x] = 0
  }
  localStorage.setItem('flag-toggles', flagToggles)
  for (let x = 0; x < operatorFlags.length; x++) {
    operatorFlags[x].style.background = 'var(--module-inactive)'
  }
})

