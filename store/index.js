export const state = () => ({
  url: 'https://new.maincore.ru/api/test/expense',
  expensesList: [],
  errorText: ''
})

export const getters = {
  expensesList(state) {
    return state.expensesList
  },
  error(state) {
    return state.errorText
  }
}

export const mutations = {
  FETCH_EXPENSES_LIST(state, data) {
    state.expensesList = data
  },
  NULLIFY_EXPENSES_LIST(state) {
    state.expensesList = []
  },
  SET_ERROR(state, text) {
    state.errorText = text
  }
}

export const actions = {
  async FetchExpensesList(context) {
    context.commit('NULLIFY_EXPENSES_LIST')
    try {
      const response = await this.$axios.get(context.state.url)
      context.commit('FETCH_EXPENSES_LIST', response.data)
    } catch (error) {
      this.dispatch('SetError', error)
      this.dispatch('FetchExpensesList')
    }
    
  },
  async DeleteExpense(context, id) {
    context.commit('NULLIFY_EXPENSES_LIST')
    try {
      await this.$axios.delete(`${context.state.url}/${id}`)
      const response = await this.$axios.get(context.state.url)
      context.commit('FETCH_EXPENSES_LIST', response.data)
    } catch (error) {
      this.dispatch('SetError', error)
      this.dispatch('FetchExpensesList')
    }
  },

  async CreateExpense(context, obj) {
    context.commit('NULLIFY_EXPENSES_LIST')
    try {
      await this.$axios.post(context.state.url, obj)
      const response = await this.$axios.get(context.state.url)
      context.commit('FETCH_EXPENSES_LIST', response.data)
    } catch (error) {
      this.dispatch('SetError', error)
      this.dispatch('FetchExpensesList')
    }
  },

  async EditExpense(context, {id, obj}) {
    context.commit('NULLIFY_EXPENSES_LIST')
    try {
      await this.$axios.patch(`${context.state.url}/${id}`, obj)
      const response = await this.$axios.get(context.state.url)
      context.commit('FETCH_EXPENSES_LIST', response.data)
    } catch (error) {
      this.dispatch('SetError', error)
      this.dispatch('FetchExpensesList')
    }
  },

  SetError(context, text) {
    context.commit('SET_ERROR', text)
  }
}