export const isDarkModeAndroid = () => new Promise((resolve: (isDark: boolean) => void) => {
  window.cordova.plugins.ThemeDetection.isAvailable((darkModeAvailable: { value: boolean }) => {
    if (darkModeAvailable.value) {
      window.cordova.plugins.ThemeDetection.isDarkModeEnabled((darkModeEnabled: { value: boolean }) => {
        resolve(darkModeEnabled.value)
      })
    } else {
      resolve(false)
    }
  })
})