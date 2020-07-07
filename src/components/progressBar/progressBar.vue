<template>
	<div @click="clickProgress" class="progress-bar" ref="progressBar">
		<div class="bar-inner">
			<div class="progress" ref="progress" ></div>
			<div @touchend.prevent="progressBtnTouchEnd" @touchmove.prevent="progressBtnTouchMove"
				@touchstart.prevent="progresssBtnTouchStart"
				class="progress-btn-wrapper"
				ref="progressBtn"
				>
				<div class="progress-btn"></div>
			</div>
		</div>
	</div>
</template>

<script>
	const progressBtnWidth = 16;
	export default {
		created(){
			this.touchs={}
		},
		props:{
			percent:{
				type:Number,
				default:0
			}
		},
		watch:{
			percent(newPercent){
				if(newPercent&&!this.touchs.flag){
					const progressBarWidth=this.$refs.progressBar.clientWidth-progressBtnWidth;
					const progressWidth=newPercent*progressBarWidth;
					this.$refs.progress.style.width=progressWidth+"px";
					this.$refs.progressBtn.style["transform"]="translate3d("+progressWidth+"px,0,0)";
				}
			}
		},
		methods:{
			progresssBtnTouchStart(e){
				this.touchs.flag=true;
				this.touchs.touchStartX=e.touches[0].pageX;
				this.touchs.left=this.$refs.progress.clientWidth;
			},
			progressBtnTouchMove(e){
				this.touchs.delatX=e.touches[0].pageX-this.touchs.touchStartX;
				const offsetWidth=Math.min(this.$refs.progressBar.clientWidth-progressBtnWidth,Math.max(0,this.touchs.left+this.touchs.delatX));
				this._offsetWidth(offsetWidth)
			},
			progressBtnTouchEnd(){
				this.touchs.flag=false;
				this._ProgressChange()
			},
			_ProgressChange(){
				const barwidth=this.$refs.progressBar.clientWidth-progressBtnWidth;
				const percent=this.$refs.progress.clientWidth/barwidth;
				this.$emit("progressChange",percent)
			},
			clickProgress(e){
				const rect = this.$refs.progressBar.offsetLeft;
				const offsetWidth=e.pageX-rect;
				this._offsetWidth(offsetWidth);
				this._ProgressChange();
			},
			_offsetWidth(offsetWidth){
				this.$refs.progress.style.width=offsetWidth+'px';
				this.$refs.progressBtn.style['transform']="translate3d("+offsetWidth+"px,0,0)";
			}
		}
	}
</script>

<style>
	.progress-bar {
		height: 30px;
	}

	.bar-inner {
		position: relative;
		top: 13px;
		height: 4px;
		background: rgba(0, 0, 0, 0.3);
	}

	.progress {
		position: absolute;
		height: 100%;
		background: blue;
	}

	.progress-btn-wrapper {
		position: absolute;
		left: -8px;
		top: -13px;
		width: 30px;
		height: 30px;
	}

	.progress-btn {
		position: relative;
		top: 7px;
		left: 7px;
		box-sizing: border-box;
		width: 16px;
		height: 16px;
		border: 3px solid blue;
		border-radius: 50%;
		background: blue;
	}
</style>
