<template>
  <div class="modal__action">
    <div class="modal_links" v-click-outside="closeModal">
      <ul>
        <li><a href="javascript:;" @click.stop="handleEdit">Edit</a></li>
        <li><a href="javascript:;" @click="handleDelete">Remove</a></li>
      </ul>
    </div>
  </div>

</template>

<script>
import '@/directive/index.js'
export default {
  name: "ActionModal",
  data(){
    return{
      isShowModal : false,
      isShowModalEdit : false
    }
  },
  methods :{
    closeModal(){
      this.isShowModal = false ;
      this.$emit('is-show-modal',this.isShowModal)
    },
    handleEdit(){
      this.isShowModalEdit = true;
      this.$emit('show-modal-edit',this.isShowModalEdit)
      this.isShowModal = false;
      this.$emit('is-show-modal',this.isShowModal)
    },
    handleDelete(){
      this.$emit('handle-delete')
    }
  },

}
</script>
