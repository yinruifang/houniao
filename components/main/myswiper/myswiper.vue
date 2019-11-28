<template>
	 <swiper class="myswiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" 
	 :duration="duration" :circular="circular">
		<swiper-item v-for="(item,index) in swiperArr" :key="index">
			<image :src="item.photoUrl" ></image>
		</swiper-item>
	</swiper>
	
</template>

<script>
	export default{
		props:{
			swiperArr:{
				type:Array,
				value:[]
			}
		},
		data(){
			return {
				indicatorDots:true,
				autoplay:true,
				interval:2000,
				duration:1000,
				circular:true
			}
		}
	}
	
</script>

<style>
	.myswiper{width: 100%;height:188px;}
	
	.myswiper image{width:100%;height:188px;}
</style>
