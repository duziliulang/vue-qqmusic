<template>
	<ul class="singerUl">
		<li class="singerLi" v-for="groups in singerList">
			<h2 class="singerListTittle">{{groups.tittle}}</h2>
			<ul>
				<li class="musicList_LI clearfix" v-for="item in groups.items">
					<img class="musicListImg fl" v-lazy=item.avatar>
					<span class="musicListSpan fl">{{item.name}}</span>
				</li>
			</ul>
		</li>
	</ul>
</template>

<script>
	export default {
		props: {
			singerList: {
				type: Array,
				default: []
			}
		}
	}
</script>

<style>
	.singerUl {
		background: #2C3E50;
	}

	.musicList_LI {
		height: 60px;
	}

	.singerLi p {
		line-height: 20px;
		height: 20px;
		color: #FFF;
		text-align: center;
	}

	.musicListImg {
		display: inline-block;
		width: 30px;
		height: 30px;
	}

	.musicListSpan {
		color: #FFF;
	}

	.musicList_LI {
		padding-left: 30px;
		box-sizing: border-box;
		display: flex;
		/*justify-content:center;*/
		align-items: center;
	}

	.musicListImg {
		margin-right: 30px;
	}

	.singerListTittle {
		color: yellow;
		/*background: #2C3E50;*/
		padding: 10px 0;
		text-align: left;
		padding-left: 30px;
		box-sizing: border-box;
	}

	.LetterListDiv {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
