var App = {
    config:{
        apiRootUrl:window.VUE_APP_API_ROOT || process.env.VUE_APP_API_ROOT,
        webUrl:window.VUE_APP_WEB_URL || process.env.VUE_APP_WEB_URL
    }
}
export default App.config