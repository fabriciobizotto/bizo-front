import AccountService from '../services/account.service'

const initialState = {
    loading: true,
    account: null,
    accounts: []
}

const getters = {
    accountList: state => state.accounts
}

const actions = {
    async fetchAll({commit}) {
        const response = await AccountService.getAccounts()
        commit('setAccounts', response.data)
    }
}

const mutations = {
    setAccounts: (state, payload) => {
        state.loading = false
        state.accounts = payload
        state.error = null
    },
    fetchAllError(state, payload) {
        state.loading = false
        state.accounts = []
        state.error = payload
    }
}
export const auth = {
    namespaced: true,
    state: initialState,
    getters, 
    actions,
    mutations
}

// export const account = {
//     namespaced: true,
//     state: initialState,
//     actions: {
    
//     },
//     getters: {},
//     mutations: {
        
//     },
// }