<template>
  <div>
    <header class="header__main">
      <nav>
        <a href="javascript:;" @click="$router.push({name : 'Home'})">
          <span class="icon-svg">
            <svg xmlns="http://www.w3.org/2000/svg" width="7.028" height="11.557" viewBox="0 0 7.028 11.557">
            <path id="Page_1" data-name="Page 1"
                  d="M5.8,9.2a.793.793,0,0,1-1.121,1.121L.263,5.913a.9.9,0,0,1,0-1.268L4.675.233A.793.793,0,0,1,5.8,1.354L1.871,5.279Z"
                  transform="translate(0.5 0.5)" fill="#b0bec5" stroke="#b0bec5" stroke-miterlimit="10"
                  stroke-width="1"/>
            </svg>
          </span>
          Tasks
        </a>
      </nav>
    </header>
    <main>
      <div class="main__title">
        <h1>{{ title }} Category</h1>
      </div>
      <div class="filter__tab">
      <span class="custom__input" @click="filterTask = 'TodoTask' " id="TodoTask">
          <input type="radio" :checked="filterTask === 'TodoTask'" name="filter">
          <label>To Do</label>
          <div class="check"></div>
      </span>
      <span class="custom__input" id="DoingTask">
          <input type="radio" :checked="filterTask === 'DoingTask' " name="filter" >
          <label @click="filterTask = 'DoingTask'">Doing</label>
          <div class="check"></div>
      </span>
      <span class="custom__input" id="DoneTask">
          <input type="radio" :checked="filterTask === 'DoneTask' " name="filter" >
          <label @click="filterTask = 'DoneTask'">Done</label>
          <div class="check"></div>
      </span>
      </div>


      <TodoTask v-if="filterTask === 'TodoTask'"/>
      <DoingTask v-if="filterTask === 'DoingTask'"/>
      <DoneTask v-if="filterTask === 'DoneTask'"/>
    </main>
    <footer>
      <button class="navigation__button" @click="goToCreateTask">
        <span class="icon-svg">
          <svg xmlns="http://www.w3.org/2000/svg" width="23.727" height="23.728" viewBox="0 0 23.727 23.728">
  <path id="Icon_awesome-pencil-alt" data-name="Icon awesome-pencil-alt"
        d="M23.076,6.587,20.939,8.724a.557.557,0,0,1-.788,0L15.007,3.58a.557.557,0,0,1,0-.788L17.144.655a2.229,2.229,0,0,1,3.147,0l2.785,2.785A2.221,2.221,0,0,1,23.076,6.587Zm-9.9-1.96L1,16.8.019,22.428a1.114,1.114,0,0,0,1.288,1.288l5.631-.987,12.17-12.17a.557.557,0,0,0,0-.788L13.964,4.627a.562.562,0,0,0-.792,0ZM5.752,15.754a.646.646,0,0,1,0-.918L12.889,7.7a.649.649,0,1,1,.918.918L6.67,15.754a.646.646,0,0,1-.918,0Zm-1.673,3.9H6.3v1.682l-2.989.524L1.873,20.417,2.4,17.427H4.079Z"
        transform="translate(-0.002 -0.005)" fill="#fff"/>
</svg>
        </span>

      </button>
    </footer>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import DoingTask from "@/components/tasks/DoingTask";
import DoneTask from "@/components/tasks/DoneTask";
import TodoTask from "@/components/tasks/TodoTask";

export default {
  name: "Category",
  components: {
    TodoTask,
    DoingTask,
    DoneTask
  },
  data() {
    return {
      title: null,
      categoryId: this.$route.params.slug,
      filterTask: 'TodoTask'
    }
  },
  methods: {
    goToCreateTask() {
      this.$router.push({name: 'CreateTask', params: {slug: this.categoryId}})
    },

  },
  computed: {
    ...mapState({
      tasks: 'tasks',
      stateTitle: 'title'
    })
  },
  mounted() {
    if (!this.stateTitle) {
      let categoryData = JSON.parse(localStorage.getItem('categories'));
      let category = categoryData.find(item => item.id === this.categoryId);
      this.title = category.title
    } else {
      this.title = this.stateTitle
    }
  }
}
</script>

<style scoped>

</style>