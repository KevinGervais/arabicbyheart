const {
  Menu
} = require('electron')
const getLanguageDict = require('./languages')

function setMenubar(app, isDev) {
  const say = getLanguageDict(app)
  const menubar = [{
    label: 'Arabic by heart',
    submenu: [{
      role: 'about',
      label: say.about
    },
    {
      type: 'separator'
    },
    {
      role: 'hide',
      label: say.hide
    },
    {
      role: 'hideothers',
      label: say.hideothers
    },
    {
      type: 'separator'
    },
    {
      role: 'quit',
      label: say.quit
    }
    ]
  },
  {
    label: say.edit,
    submenu: [{
      role: 'cut',
      label: say.cut
    },
    {
      role: 'copy',
      label: say.copy
    },
    {
      role: 'paste',
      label: say.paste
    }
    ]
  },
  {
    label: say.view,
    submenu: [{
      role: 'minimize',
      label: say.minimize
    },
    {
      type: 'separator'
    },
    {
      role: 'reload',
      label: say.reload
    },
    {
      role: 'forcereload',
      label: say.forcereload
    },
    {
      type: 'separator'
    },
    {
      role: 'toggledevtools',
      label: say.toggledevtools
    },
    {
      role: 'togglefullscreen',
      label: say.togglefullscreen
    }
    ]
  }
  ]
  const menu = Menu.buildFromTemplate(menubar)
  Menu.setApplicationMenu(menu)
}
module.exports = setMenubar 