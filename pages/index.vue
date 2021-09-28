<template lang="pug">
  .expenses-app
    .expenses-app__window
      .expenses-app__list
        ExpensesItem(
          v-for="item in expensesList"
          :key="item.id"
          :item="item"
          @editExpense="editExpense"
        )
      Preloader(v-if="expensesList.length === 0")
      .expenses-app__btn(@click="addExpense") +
      transition(name="modal-fade")
        ExpensesModal(
          v-if="modalInfo.show"
          :dataModal="modalInfo.processingData"
          @closeModal="closeModal"
        )
      Error(
        v-if="error"
        :text="error"
        @closeError="closeError"
      )
</template>

<script>
export default {
  data() {
    return {
      modalInfo: {
        show: false,
        processingData: 0,
      }
    }
  },
  computed: {
    expensesList() {
      return this.$store.getters['expensesList']
    },
    error() {
      return this.$store.getters['error']
    }
  },
  methods: {
    setData() {
      this.$store.dispatch('FetchExpensesList')
    },
    addExpense() {
      this.modalInfo.show = true
    },
    editExpense(obj) {
      this.modalInfo.processingData = obj
      this.modalInfo.show = true
    },
    closeModal() {
      this.modalInfo.show = false
      this.modalInfo.processingData = 0
    },
    closeError() {
      this.$store.dispatch('SetError', '')
    }
  },
  created() {
    this.$store.dispatch('FetchExpensesList')
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  overflow: hidden;
  input{
    background-color: transparent;
    box-sizing: border-box;
    color: #fff;
    outline: none;
    padding: 5px 10px;
    border: 2px solid #fff;
    font-size: 14px;
  }
}
.expenses-app{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-image: url('~/static/bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #fff;
  position: relative;
  &:after{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: radial-gradient(48.78% 86.71% at 50% 50%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.9) 100%);
  }
  &__list{
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
  &__btn{
    font-size: 40px;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 5px;
    top: 20px;
    border: 3px solid #fff;
    cursor: pointer;
  }
  &__window{
    display: flex;
    padding: 0 50px 0 20px;
    width: 100%;
    height: 100%;
    animation: showWindow 1s linear;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
  .modal-fade-enter-active {
    transition: all .3s ease;
  }
  .modal-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .modal-fade-enter, .modal-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }
  @keyframes showWindow {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0%);
    }
  }
}
</style>
