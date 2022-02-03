<template>
  <div>
    <header class="header__main">
      <nav>
        <a href="javascript:;" @click="$router.back()">

          <span class="icon-svg">
            <svg xmlns="http://www.w3.org/2000/svg" width="7.028" height="11.557" viewBox="0 0 7.028 11.557">
            <path id="Page_1" data-name="Page 1"
                  d="M5.8,9.2a.793.793,0,0,1-1.121,1.121L.263,5.913a.9.9,0,0,1,0-1.268L4.675.233A.793.793,0,0,1,5.8,1.354L1.871,5.279Z"
                  transform="translate(0.5 0.5)" fill="#b0bec5" stroke="#b0bec5" stroke-miterlimit="10"
                  stroke-width="1"/>
            </svg>
            back
          </span>
        </a>
      </nav>
    </header>
    <main>
      <div class="main__title">
        <h1>Edit Task</h1>
      </div>
      <div class="create__task">
        <input type="text" placeholder="Please Enter Your Title" v-model="task.title">
        <textarea cols="30" rows="10" placeholder="Please Enter Your text" v-model="task.body"></textarea>
      </div>
    </main>
    <footer>
      <button class="navigation__button" @click="updateTask()">
        <span class="icon-svg">
          <svg height="28" viewBox="0 0 1792 1792" width="28" xmlns="http://www.w3.org/2000/svg"><path
              d="M512 1536h768v-384h-768v384zm896 0h128v-896q0-14-10-38.5t-20-34.5l-281-281q-10-10-34-20t-39-10v416q0 40-28 68t-68 28h-576q-40 0-68-28t-28-68v-416h-128v1280h128v-416q0-40 28-68t68-28h832q40 0 68 28t28 68v416zm-384-928v-320q0-13-9.5-22.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 22.5v320q0 13 9.5 22.5t22.5 9.5h192q13 0 22.5-9.5t9.5-22.5zm640 32v928q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1344q0-40 28-68t68-28h928q40 0 88 20t76 48l280 280q28 28 48 76t20 88z"
              fill="#fff"
          /></svg>
        </span>

      </button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "EditTask",
  data() {
    return {
      task : {
        title : '',
        body : ''
      },
      categoryId : this.$route.params.slug,
    }
  },
  methods:{
    updateTask(){
      if (this.task.title){
        let indexTask = this.allTasks.findIndex(item => item.id === this.task.id)
        this.allTasks[indexTask].title = this.task.title;
        this.allTasks[indexTask].body = this.task.body;
        localStorage.setItem('tasks',JSON.stringify(this.allTasks))
        this.$router.back();
      }else {
        alert('title can not be empty')
      }

    }
  },
  mounted() {
    this.allTasks = JSON.parse(localStorage.getItem('tasks'))
    this.task = this.allTasks.find(items => items.id == this.categoryId &&  items.status === 'todo')
  }
}
</script>

<style scoped>

</style>