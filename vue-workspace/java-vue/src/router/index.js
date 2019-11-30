import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BlogLogin from '@/components/manage/BlogLogin.vue'
import BlogIndex from '@/components/home/BlogIndex.vue'
import NewContact from '@/components/NewContact'//新添加，之后在下方的component: NewContact才会生效
import HomeBlog from '@/components/HomeBlog'
import ListBlog from '@/components/ListBlog'
import AddBlog from '@/components/AddBlog'
import UpdateBlog from '@/components/UpdateBlog'
import NewHelloWorld from '@/components/NewHelloWorld'
import ChildComment from '@/components/ChildComment'
import ChildComment2 from '@/components/ChildComment2'
import FatherComment from '@/components/FatherComment'
import DateComment from '@/components/DateComment'
import CheckboxComment from '@/components/CheckboxComment'
import ChildComment3 from '@/components/ChildComment3'

import NewComment1 from '@/components/NewComment1'
import NewComment2 from '@/components/NewComment2'
import NewComment3 from '@/components/NewComment3'
import NewComment4 from '@/components/NewComment4'
import editInstrumentSetup from '@/components/editInstrumentSetup'

import CommentOne from '@/components/learnComment/CommentOne'

import util from '@/common/util'
Vue.prototype.$util = util




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'BlogIndex',
      component: BlogIndex
    },
    {
      path: '/manage',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'BlogLogin',
      component: BlogLogin
    },
    {
      path: '/NewContact',
      name: 'NewContact',
      component: NewContact
    },
    {
      path: '/homeBlog',
      name: 'HomeBlog',
      component: HomeBlog
    },
    {
      path: '/listBlog',
      name: 'ListBlog',
      component: ListBlog
    },
    {
      path: '/addBlog',
      name: 'AddBlog',
      component: AddBlog
    },
    {
      path: '/updateBlog/:id',
      name: 'UpdateBlog',
      component: UpdateBlog
    },
    {
      path: '/NewHelloWorld',
      name: 'NewHelloWorld',
      component: NewHelloWorld
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ChildComment',
      name: 'ChildComment',
      component: ChildComment
    },
    {
      path: '/ChildComment2',
      name: 'ChildComment2',
      component: ChildComment2
    },
    {
      path: '/FatherComment',
      name: 'FatherComment',
      component: FatherComment
    },
    {
      path: '/DateComment',
      name: 'DateComment',
      component: DateComment
    },
    {
      path: '/CheckboxComment',
      name: 'CheckboxComment',
      component: CheckboxComment
    },
    {
      path: '/ChildComment3',
      name: 'ChildComment3',
      component: ChildComment3
    }
    ,{
      path: '/NewComment1',
      name: 'NewComment1',
      component: NewComment1
    },
    {
      path: '/editInstrumentSetup',
      name: 'editInstrumentSetup',
      component: editInstrumentSetup
    },
    {
      path: '/NewComment2',
      name: 'NewComment2',
      component: NewComment2
    },
    {
      path: '/NewComment3',
      name: 'NewComment3',
      component: NewComment3
    },
    {
      path: '/NewComment4',
      name: 'NewComment4',
      component: NewComment4
    },
    {
      path: '/CommentOne',
      name: 'CommentOne',
      component: CommentOne
    }
  ]
})


