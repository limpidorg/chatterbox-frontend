
const instanceProxy = new Proxy({}, {
    proxiedInstance: null,
    get(target, name) {
        if (name === 'instance') {
            return this.proxiedInstance
        }
        if (this.proxiedInstance) {
            return this.proxiedInstance[name]
        } else {
            console.error("[vue-alerts] No instance was defined.")
        }
    },
    set(target, name, value) {
        if (name === 'instance') {
            this.proxiedInstance = value
            for (let key in options) {
                this.proxiedInstance[key] = options[key]
            }
            return true
        } else {
            console.error("[vue-alerts] Cannot set property '" + name + "' on the protected alert instance.")
            return false
        }
    }
})



export {
    $alert
}