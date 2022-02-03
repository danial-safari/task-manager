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
          <li><a href="javascript:;" @click.prevent="handleDoneTask(dataModal.id)">Done</a></li>
          <li><a href="javascript:;" @click.prevent="handleToDoTask(dataModal.id)">Todo</a></li>
          <li><a href="javascript:;" @click.prevent="handleRemove(dataModal.id)">Remove</a></li>
        </ul>
      </div>
    </div>
    <transition-group name="steps" mode="out-in" tag="div">
      <div
          class="task__section danger"
          @click.stop="showModalMore(task.id)"
          v-for="task in doingTasks"
          :key="task.id"
      >
        <span class="doing-icon ">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#fff">
<g><g><path d="M27,3H5C4.4477539,3,4,2.5527344,4,2s0.4477539-1,1-1h22c0.5522461,0,1,0.4472656,1,1S27.5522461,3,27,3z"/></g><g><path d="M27,31H5c-0.5522461,0-1-0.4472656-1-1s0.4477539-1,1-1h22c0.5522461,0,1,0.4472656,1,1S27.5522461,31,27,31z"/></g><g><path d="M24.3999023,31H7.6000977c-0.5507813,0-0.9980469-0.4453125-1-0.9970703    C6.5996094,29.8125,6.6049805,25.2753906,8.3828125,21.4013672C9.5849609,18.78125,10.9506836,16.9355469,11.7231445,16    c-0.7724609-0.9355469-2.1381836-2.78125-3.340332-5.4013672C6.6049805,6.7246094,6.5996094,2.1875,6.6000977,1.9970703    C6.6020508,1.4453125,7.0493164,1,7.6000977,1h16.7998047c0.5507813,0,0.9980469,0.4453125,1,0.9970703    c0.0004883,0.1904297-0.0048828,4.7275391-1.7827148,8.6015625C22.4150391,13.21875,21.0493164,15.0644531,20.2768555,16    c0.7724609,0.9355469,2.1381836,2.78125,3.340332,5.4013672c1.777832,3.8740234,1.7832031,8.4111328,1.7827148,8.6015625    C25.3979492,30.5546875,24.9506836,31,24.3999023,31z M8.6420898,29h14.7158203    c-0.0996094-1.4716797-0.4345703-4.3154297-1.5581055-6.7646484c-1.6044922-3.4960938-3.550293-5.5166016-3.5693359-5.5371094    c-0.3779297-0.3876953-0.3779297-1.0087891,0-1.3964844c0.019043-0.0205078,1.9648438-2.0410156,3.5693359-5.5371094    C22.9233398,7.3154297,23.2583008,4.4716797,23.3579102,3H8.6420898c0.0996094,1.4716797,0.4345703,4.3154297,1.5581055,6.7646484    c1.6044922,3.4960938,3.550293,5.5166016,3.5693359,5.5371094c0.3779297,0.3876953,0.3779297,1.0087891,0,1.3964844    c-0.019043,0.0205078-1.9648438,2.0410156-3.5693359,5.5371094C9.0766602,24.6845703,8.7416992,27.5283203,8.6420898,29z"/></g><g><path d="M11.2239609,26.980032c0,0-0.0082922-2.5372696,0.9618406-4.6516628S14.7377195,19.019968,16,19.019968    s2.8440647,1.1940098,3.8141975,3.3084011s0.9618416,4.6516628,0.9618416,4.6516628H11.2239609z"/></g></g>
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
      doingTasks : [],
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
    handleSaveToStorage(status){
      localStorage.setItem('tasks',JSON.stringify(this.allTasks))
      this.doingTasks = this.allTasks.filter(items => items.categoryId == this.categoryId &&  items.status === status)
    },
    changeStatus(id , status){
      let idTask = this.allTasks.findIndex(item=> item.id === id)
      this.allTasks[idTask].status = status;
      this.handleSaveToStorage('doing')
    },
    handleDoneTask(id){
      this.changeStatus(id , 'done')
      this.isShowModalAction = false;
    },
    handleToDoTask(id){
      this.changeStatus(id,'todo')
      this.isShowModalAction = false;
    },
    handleRemove(id){
      let indexTask = this.allTasks.findIndex(item=> item.id === id)
      this.allTasks.splice(indexTask , 1)
      this.handleSaveToStorage('doing')
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
      this.filterTasks = this.allTasks.filter(items => items.categoryId == this.categoryId &&  items.status === 'doing')
      let  n = 250;
      this.filterTasks.forEach((id, i)=>{
        setTimeout(()=>{
          this.doingTasks.push({...id})
        },n * (i + 1))
      })
    }

  }

}
</script>

<style scoped>

</style>