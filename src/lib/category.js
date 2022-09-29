// This should be committed as a JSON file to the specs repo - but for now, this will do
const specCategories = {
  "Wallets, signing transactions and network selection": {
      "specs": ["0001-WALL", "0002-WCON", "0003-WTXN", "0004-EWAL", "0005-ETXN", "0006-NETW"]
  },
  "Bridges, Transfers and Vesting": {
      "specs": ["1001-DEPO", "1002-WITH", "1003-TRAN", "1004-ASSO", "1005-VEST"]
  },
  "Staking": {
      "specs": ["2001-STKE", "2002-SINC"]
  },
  "Governance": {
      "specs": ["3001-VOTE", "3002-PROP", "3003-PMAN", "3004-PMAC", "3005-PASN", "3006-PASC", "3007-PNEC", "3008-PFRO"]
  },
  "Treasury": {
      "specs": ["4001-TRES"]
  },
  "Liquidity provision": {
      "specs": ["5001-LIQF", "5002-LIQP", "5003-LIQI"]
  },
  "Markets and analysis": {
      "specs": ["6001-MARK", "6002-MARD", "6003-ORDB", "6004-PHIS", "6005-THIS"]
  },
  "Collateral, Orders, Positions and Fills": {
      "specs": ["7001-COLL", "7002-SORD", "7003-MORD", "7004-POSI", "7005-FILL", "7006-FEES"]
  },
  "Block exploring": {
      "specs": ["8001-BLOX"]
  },
  'Unknown': {
    'specs': []
  }
}

function getCategoryForSpec(code) {
  const categories = Object.keys(specCategories).filter(category => {
    return (specCategories[category].specs.indexOf(code) !== -1)
  })

  // There shouldn't be more than one. But if there is, take the first one.
  return (categories.length > 0) ? categories[0] : 'Unknown'
}

function setOrIncreaseProperty(category, property, value) {

  if (specCategories[category][property]) {
    specCategories[category][property] += value
  } else {
    specCategories[category][property] = value
  }
}

function increaseCodesForCategory(category, count) {
  setOrIncreaseProperty(category, 'codes', count)
}

function increaseCoveredForCategory(category, count) {
  setOrIncreaseProperty(category, 'covered', count)
}

function increaseFeatureCoveredForCategory(category, count) {
  setOrIncreaseProperty(category, 'featureCovered', count)
}

function increaseSystemTestCoveredForCategory(category, count) {
  setOrIncreaseProperty(category, 'systemTestCovered', count)
}

function increaseUncoveredForCategory(category, count) {
  setOrIncreaseProperty(category, 'uncovered', count)
}

function increaseSpecCountForCategory(category) {
  setOrIncreaseProperty(category, 'specCount', 1)
}

function increaseAcceptableSpecsForCategory(category) {
  setOrIncreaseProperty(category, 'acceptableSpecCount', 1)
}

module.exports = {
  specCategories,
  getCategoryForSpec,
  increaseCodesForCategory,
  increaseCoveredForCategory,
  increaseUncoveredForCategory,
  increaseSpecCountForCategory,
  increaseSystemTestCoveredForCategory,
  increaseFeatureCoveredForCategory,
  increaseAcceptableSpecsForCategory
}
