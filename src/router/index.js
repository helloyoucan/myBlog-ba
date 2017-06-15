import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		redirect: '/Login'
	}, {
		path: '/Login',
		component: resolve => require(['../components/Login.vue'], resolve)
	}, {
		path: '/Index',
		component: resolve => require(['../components/Index.vue'], resolve),
		children: [{
			path: '/',
			redirect: '/Home'
		}, {
			path: '/Home',
			component: resolve => require(['../components/Home/Home.vue'], resolve)
		}, {
			path: '/PersonalInfo',
			component: resolve => require(['../components/PersonalInfo/PersonalInfo.vue'], resolve)
		}, {
			path: '/ArticleList',
			component: resolve => require(['../components/Article/ArticleList.vue'], resolve)
		}, {
			path: '/ArticleDelete',
			component: resolve => require(['../components/Article/ArticleDelete.vue'], resolve)
		}, {
			path: '/BookmarksClassify',
			component: resolve => require(['../components/Bookmarks/BookmarksClassify.vue'], resolve)
		}, {
			path: '/BookmarksList',
			component: resolve => require(['../components/Bookmarks/BookmarksList.vue'], resolve)
		}, {
			path: '/BookmarksDelect',
			component: resolve => require(['../components/Bookmarks/BookmarksDelect.vue'], resolve)
		}]

	}, ]
})