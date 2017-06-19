<template>
	<el-menu class="diyscrollbar" :default-active="onRoutes" @select="handleSelect" router>
		<el-menu-item index="Home">
			<i class="el-icon-menu"></i>首页
		</el-menu-item>
		<el-menu-item index="PersonalInfo">
			<i class="el-icon-information"></i>个人信息管理
		</el-menu-item>
		<el-submenu index="Article">
			<template slot="title">
				<i class="el-icon-document"></i>文章管理
			</template>
			<el-menu-item index="ArticleList">文章列表</el-menu-item>
			<el-menu-item index="ArticleDelete">回收站</el-menu-item>
		</el-submenu>
		<el-submenu index="Bookmarks">
			<template slot="title">
				<i class="el-icon-star-on"></i>书签管理
			</template>
			<el-menu-item index="BookmarksList">书签列表</el-menu-item>
			<el-menu-item index="BookmarksDelect">回收站</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
	export default {
		name: "Sidebar",
		computed: {
			onRoutes() {
				return this.$route.path.replace('/', '');
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				var key_arr = {
					Home: "首页",
					PersonalInfo: "个人信息管理",
					Article: "文章管理",
					ArticleList: "文章列表",
					ArticleDelete: "回收站",
					Bookmarks: "书签管理",
					BookmarksList: "书签列表",
					BookmarksDelect: "回收站",
				};
				var text_arr = [];
				for(var i = 0, l = keyPath.length; i < l; i++) {
					text_arr.push(key_arr[keyPath[i]]);
				}
				this.$emit('SetBreadcrumb', text_arr)
			},
		},
		created() {
			this.$emit('SetBreadcrumb', ['首页'])
		}
	}
</script>

<style>
	.el-menu {
		background-color: white !important;
		overflow: auto;
	}
</style>
