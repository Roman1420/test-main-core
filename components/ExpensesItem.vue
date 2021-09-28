<template lang="pug">
  .expenses-item
    .expenses-item-id {{item.id}}
    span name: {{item.name}}
    .expenses-item-amount transaction amount: {{item.sum}}
    .expenses-item-date {{item.expense_at}}
    .expenses-item__btn-delete(@click="deleteExpense(item.id)") DELETE
    .expenses-item__btn(@click="editExpense(item)") EDIT
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    editExpense(obj) {
      this.$emit('editExpense', obj)
    },
    deleteExpense(id) {
      this.$store.dispatch('DeleteExpense', id)
    }
  }
}
</script>

<style lang="scss">
  .expenses-item{
    padding: 20px 10px;
    width: 350px;
    height: 150px;
    border: 3px solid #fff;
    display: flex;
    flex-direction: column;
    position: relative;
    font-size: 18px;
    margin: 0 15px 10px 0;
    &-amount{
      height: 100%;
    }
    &-id, &-date{ 
      display: flex;
      align-items: center;
      font-size: 14px;
      color: rgba(255,255,255, .5);
      position: absolute;
      left: 10px;
      &:before{
        white-space: pre;
      }
    }
    &-id{ 
      top: 5px;
      &:before{
        content: 'id: ';
      }
    }
    &-date{
      bottom: 5px;
      &:before{
        content: 'date: '
      }
    }
    &__btn, &__btn-delete{
      font-weight: bold;
      align-self: flex-end;
      cursor: pointer;
      margin-top: 10px;
    }
    &__btn-delete{
      color: green;
    }
  }
</style>
