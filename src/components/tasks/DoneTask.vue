<template>
  <div>
    <div class="modal__more" v-if="isShowModalMore">
      <div class="modal__box" v-click-outside="closeShowModalMore">
        <div class="modal__header">
          <h2>{{ dataModal.title }}</h2>
        </div>
        <div class="modal__content">
          <p>{{ dataModal.body }}</p>
        </div>
      </div>
    </div>
    <div class="modal__action" v-if="isShowModalAction">
      <div class="modal_links" v-click-outside="closeShowModalAction">
        <ul>
          <li><a href="javascript:;" @click.prevent="handleDoingTask(dataModal.id)">Doing</a></li>
          <li><a href="javascript:;" @click.prevent="handleToDoTask(dataModal.id)">Todo</a></li>
          <li><a href="javascript:;" @click.prevent="handleRemove(dataModal.id)">Remove</a></li>
        </ul>
      </div>
    </div>
    <transition-group name="steps" mode="out-in" tag="div">
        <div
            class="task__section success"
            @click.stop="showModalMore(task.id)"
            v-for="task in doneTasks"
            :key="task.id"
        >
        <span class="check-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
  <path id="Icon_awesome-check" data-name="Icon awesome-check" d="M6.533,18.64.282,12.388a.962.962,0,0,1,0-1.36l1.36-1.36a.962.962,0,0,1,1.36,0l4.211,4.211,9.021-9.02a.962.962,0,0,1,1.36,0l1.36,1.36a.962.962,0,0,1,0,1.36L7.894,18.64A.962.962,0,0,1,6.533,18.64Z" transform="translate(0 -4.577)" fill="#fff"/>
</svg>

      </span>
          <h6>{{ task.title }}</h6>
          <a href="javascript:;">
        <span class="icon-svg" @click.stop="ShowModalAction(task.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="22" viewBox="0 0 4.531 22.247">
  <g id="Icon_feather-more-vertical" data-name="Icon feather-more-vertical" transform="translate(1 1)">
    <path id="Path_2" data-name="Path 2"
          d="M19.031,17.765A1.265,1.265,0,1,1,17.765,16.5,1.265,1.265,0,0,1,19.031,17.765Z"
          transform="translate(-16.5 -7.642)" fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"
          stroke-width="2"/>
    <path id="Path_3" data-name="Path 3" d="M19.031,7.265A1.265,1.265,0,1,1,17.765,6,1.265,1.265,0,0,1,19.031,7.265Z"
          transform="translate(-16.5 -6)" fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"
          stroke-width="2"/>
    <path id="Path_4" data-name="Path 4" d="M19.031,28.265A1.265,1.265,0,1,1,17.765,27,1.265,1.265,0,0,1,19.031,28.265Z"
          transform="translate(-16.5 -9.284)" fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"
          stroke-width="2"/>
  </g>
</svg>
         </span>
          </a>
        </div>
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "DoingTask",
  data(){
    return{
      isShowModalMore : false,
      isShowModalAction : false,
      dataModal : null,
      allTasks : null,
      filterTasks : null,
      categoryId : this.$route.params.slug,
      taskId : null,
      doneTasks : [],
    }
  },
  methods:{
    closeShowModalAction(){
      this.isShowModalAction = false
    },
    closeShowModalMore(){
      this.isShowModalMore = false
    },
    ShowModalAction(id) {
      this.isShowModalAction = true
      this.dataModal = this.allTasks.find(item => item.id === id)
    },
    showModalMore(id) {
      this.isShowModalMore = !this.isShowModalMore;
      this.dataModal = this.allTasks.find(item => item.id === id)
    },

    changeStatus(id , status){
      let idTask = this.allTasks.findIndex(item=> item.id === id)
      this.allTasks[idTask].status = status;
      localStorage.setItem('tasks',JSON.stringify(this.allTasks))
      this.doneTasks = this.allTasks.filter(items => items.categoryId == this.categoryId &&  items.status === 'done')
    },
    handleDoingTask(id){
      this.changeStatus(id, 'doing')
      this.isShowModalAction = false;
    },
    handleToDoTask(id){
      this.changeStatus(id, 'todo')
      this.isShowModalAction = false;
    },
    handleRemove(id){
      let findTask = this.allTasks.find(item=> item.id === id)
      let objId= this.allTasks.indexOf(findTask);
      this.allTasks.splice(objId,1)
      localStorage.tasks = JSON.stringify(this.allTasks);
      this.filterTasks = this.allTasks.filter(items => items.categoryId == this.categoryId &&  items.status === 'completed')
      this.isShowModalAction = false
    },
    ...mapActions(['getLocalStorageTasks']),
  },
  computed:{
    ...mapState(['tasks']),

  },
  mounted() {
    //get Tasks from store
    if ('tasks' in localStorage){
      this.allTasks = JSON.parse(localStorage.getItem('tasks')) ;
      this.filterTasks = this.allTasks.filter(items => items.categoryId == this.categoryId &&  items.status === 'done')
      let  n = 250;
      this.filterTasks.forEach((id, i)=>{
        setTimeout(()=>{
          this.doneTasks.push({...id})
        },n * (i + 1))
      })
    }
  }

}
</script>

<style scoped>

</style>