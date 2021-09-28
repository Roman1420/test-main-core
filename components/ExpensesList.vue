<template lang="pug">
  .expenses-list
    ExpensesItem(
      v-for="item in expensesList"
      :key="item.id"
      :item="item"
    )
</template>

<script>
export default {
  computed: {
    expensesList() {
      return this.$store.getters['expensesList']
    },
  },
  methods: {
    setData() {
      this.$store.dispatch('FetchExpensesList')
    }
  },
  created() {
    this.$store.dispatch('FetchExpensesList')
  },
}
</script>

<style lang="scss">
.expenses-list{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow-y: auto;
  padding: 20px 0;
  &::-webkit-scrollbar{
    width: 4px;
    background-color: transparent;
    &-thumb{
      background-color: rgb(2, 99, 2);
    }
  }
}
</style>
