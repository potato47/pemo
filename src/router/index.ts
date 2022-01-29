import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import TSEditor from '../views/TSEditor.vue'
import ImageEditor from '../views/ImageEditor.vue'
import JSONEditor from '../views/JSONEditor.vue'
import MarkdownEditor from '../views/MarkdownEditor.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ts',
    name: 'TSEditor',
    component: TSEditor
  },
  {
    path: '/image',
    name: 'ImageEditor',
    component: ImageEditor
  },
  {
    path: '/json',
    name: 'JSONEditor',
    component: JSONEditor
  },
  {
    path: '/markdown',
    name: 'MarkdownEditor',
    component: MarkdownEditor
  }
]

const historyUrl = window.process ? process.env.BASE_URL : '.'

const router = createRouter({
  history: createWebHistory(historyUrl),
  routes
})

export default router
