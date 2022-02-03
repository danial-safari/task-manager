<template>
  <div class="home">
    <CreateModal
        @create-category="createCategory"
        @is-show-modal="(isShowModal) => isShowModalCreate = isShowModal"
        v-if="isShowModalCreate"
    />
      <ActionModal
        v-if="isShowModalAction"
        @is-show-modal="(ShowModal) => isShowModalAction = ShowModal"
        :isShowModalEdit="isShowModalEdit"
        @show-modal-edit="(ShowModalEdit) => this.isShowModalEdit = ShowModalEdit"
        @handle-delete="removeCategory"
    />
    <EditModal
        v-if="isShowModalEdit"
        @is-show-modal="(isShowModal) => isShowModalEdit = isShowModal"
        :categoryEdit="categoryEdit"
        @update-title="updateCategory"
    />
    <header class="header__main">
      <nav>
        <a href="#">
          Home
        </a>
      </nav>
    </header>
    <main>
      <div class="main__title">
        <h1>All Categories</h1>
      </div>
      <div class="categories__box">
        <div class="item__category"
             @click="goToCategory(category.id,category.title)"
             :style="`background: ${category.color}; box-shadow: 0 -1px 9px ${category.color};`"
             v-for="(category,i) in categories"
             :key="category.id">
          <div class="category__header" @click.stop="handleShowModalAction(i,category.title)">
            <a href="javascript:;">
              <span class="icon-svg">
                <svg xmlns="http://www.w3.org/2000/svg" width="4.531" height="20" viewBox="0 0 4.531 22.247">
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
          <div class="category__content">
            <h1>{{ category.title }}</h1>
          </div>
          <div class="category__footer">
            <span><strong>Tasks : </strong>{{ countPending(category.id) }}</span>
            <span><strong>Completed : </strong>{{ countCompleted(category.id) }}</span>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <button class="navigation__button no-select"
              @click.stop="isShowModalCreate = !isShowModalCreate;"
              :style="isShowModalCreate ? 'transform: rotate(45deg)' : '' "

      >
        <span class="icon-svg">
          <svg xmlns="http://www.w3.org/2000/svg" width="16.149" height="16.149" viewBox="0 0 16.149 16.149">
          <path id="Page_1" data-name="Page 1"
                d="M8.074,0A1.275,1.275,0,0,0,6.8,1.275V6.8H1.275a1.275,1.275,0,1,0,0,2.55H6.8v5.525a1.275,1.275,0,1,0,2.55,0V9.349h5.525a1.275,1.275,0,1,0,0-2.55H9.349V1.275A1.275,1.275,0,0,0,8.074,0Z"
                fill="#fff"/>
          </svg>
        </span>
      </button>
    </footer>
  </div>
</template>

<script>

import CreateModal from '@/components/homeModal/CreateModal'
import ActionModal from '@/components/homeModal/ActionModal'
import EditModal from '@/components/homeModal/EditModal'
import { IdGenerator, RandomColor } from '@/utils/index'

export default {
  name: 'Home',
  components: {
    CreateModal,
    ActionModal,
    EditModal
  },
  data() {
    return {
      isShowModalCreate: false,
      isShowModalAction: false,
      isShowModalEdit: false,
      categoryEdit: '',
      categories: [],
      colors: ['#2798F7', '#27F79C', '#2B2B3E'],
      countCategories: []
    }
  },
  methods: {
    handleShowModalAction(id, title) {
      this.isShowModalAction = true;
      this.idCategory = id;
      this.categoryEdit = title;
    },
    countPending(id) {
      const count = this.countCategories.filter(item => item.id === id);
      return count[0]?.pending || 0;
    },

    countCompleted(id) {
      const count = this.countCategories.filter(item => item.id === id);
      return count[0]?.completed || 0;
    },
    removeCategory() {
      this.categories.splice(this.idCategory, 1)
      localStorage.categories = JSON.stringify(this.categories);
      this.isShowModalAction = false;
    },
    updateCategory(nameEdited) {
      this.categories[this.idCategory].title = nameEdited
      localStorage.setItem('categories', JSON.stringify(this.categories))
      this.isShowModalEdit = false
    },
    goToCategory(id, title) {
      this.$router.push({name: 'Category', params: {slug: id}})
      this.$store.dispatch('getTitle', title)
    },
    createCategory(name) {
      this.categories.push({
        id: IdGenerator(),
        title: name,
        color: RandomColor(this.colors)
      })
      localStorage.setItem('categories', JSON.stringify(this.categories))
      this.isShowModalCreate = false;
    },
  },
  mounted() {
    if ('categories' in localStorage) {
      this.categories = JSON.parse(localStorage.getItem('categories'));
      if ('tasks' in localStorage) {
        this.allTasks = JSON.parse(localStorage.getItem('tasks')) ;
        this.categories.forEach((categories) => {
          let todos = 0;
          let completed = 0;
          this.allTasks.forEach((tasks) => {
            if (tasks.categoryId === categories.id && tasks.status === 'todo') {
              todos++;
            } else if (tasks.categoryId === categories.id && tasks.status === 'done') {
              completed++;
            }
          })
          this.countCategories.push({
            id: categories.id,
            pending: todos,
            completed: completed
          })
        })

      }
    }



  }
}
</script>
