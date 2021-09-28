<template lang="pug">
  .expenses-modal
    .expenses-modal__cancel-wrap(@click="$emit('closeModal')")
    .expenses-modal__wrap
      .expenses-modal__header
        .expenses-modal__header-value Customization: 
        .expenses-modal__header-desc {{ dataModal ? 'Edit transfer' : 'Add transfer'}}
      .expenses-modal__info
        .expenses-modal__info-id(
          v-if="dataModal"
        ) {{currentData.id}}
        .expenses-modal__info-desc Select transfer-name:
        input.expenses-modal__info-input(v-model="currentData.name")
        .expenses-modal__info-desc Select sum:
        input.expenses-modal__info-input(
          v-model.number="currentData.sum"
          type="number"
        )
        .expenses-modal__info-desc Select date:
        input.expenses-modal__info-input(v-model="currentData.expense_at")
      .expenses-modal__btn(@click="setCurrentOptions") {{ dataModal ? 'Press to save' : 'Press to add'}}
</template>

<script>
export default {
  props: {
    dataModal: [Object, Number],
  },
  data() {
    return {
      currentData: {
        name: '',
        sum: 0,
        expense_at: '',
      }
    }
  },
  methods: {
    fetchCurrentData() {
      this.currentData.name = this.dataModal.name
      this.currentData.sum = this.dataModal.sum
      this.currentData.expense_at = this.dataModal.expense_at
    },
    setCurrentOptions() {
      if (this.currentData.name && this.currentData.sum > 0 && this.currentData.expense_at) {
        this.dataModal ? this.editExpense(this.dataModal.id, this.currentData) : this.createExpense(this.currentData)
        this.$emit('closeModal')
      } else {
        console.log('-')
      }
    },
    createExpense(obj) {
      this.$store.dispatch('CreateExpense', obj)
    },
    editExpense(id, obj) {
      this.$store.dispatch('EditExpense', {id: id, obj: obj})
    },
  },
  mounted() {
    if (this.dataModal) {
      this.fetchCurrentData()
    }
  }
}
</script>

<style lang="scss">
.expenses-modal{
  overflow: hidden;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  &__cancel-wrap, &__wrap{
    position: absolute;
  }
  &__cancel-wrap{
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0,0,0, .8);
  }
  &__wrap{
    border: 5px solid #fff;
    padding: 10px;
    width: 45%;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    background-color: rgba(0,0,0, .4);
    z-index: 2;
  }
  &__header{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    white-space: pre;
    font-size: 24px;
    margin-bottom: 20px;
    &-value{
      color: #fff;
    }
    &-desc{
      color: green;
      font-weight: bold;
      animation: blinkingHead .4s infinite;
    }
  }
  &__info{
    width: 100%;
    display: flex;
    flex-direction: column;
    &-desc{
      color: rgba(255,255,255, .5);
      margin-bottom: 7px;
    }
    &-input{
      margin-bottom: 15px;
    }
  }
  &__btn{
    width: 100%;
    text-align: center;
    border: 3px solid green;
    color: green;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
  }
  @keyframes blinkingHead {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
}
</style>
