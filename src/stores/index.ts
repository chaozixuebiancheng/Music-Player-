//只实现pinia的持久化，pinia具体实现在modules里


import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// pinia persist
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia