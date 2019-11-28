<template>
	<view class="s-con">
		<view class="s-title">
			<view @click="changeType(true)" :class="[sType?'active':'']">洲</view>
			<view @click="changeType(false)" :class="[!sType?'active':'']">季节</view>
		</view>	
		<!--几大洲-->
		<view v-if="sType">
			<view class="s-text-outer">
				<view class="s-text " v-for="(item,index) in continent" :key="index"
				:class="[item == defaultName?'ac':'']"
				@click="changeContinent(item)"
				>{{item}}</view>
			</view>
			<!--该洲下面对应的国家数据-->
			<view class="s-country">
				<view v-for="(item,index) in countryArr " :key="index">
					{{item.country}}
				</view>
				
				
			</view>
		</view>
		<view v-else>季节的内容</view>
		
	</view>
</template>

<script>
	//引入获取数据的
	import pagedata from '../../utils/getdata.js';
	export default {
		data(){
			return {
				sType:true ,//true 洲下面有横线    false 显示季节下面有横线 
				countryArr:[],//洲下面的国家数组
				defaultName:"欧洲",
				continent:["欧洲","亚洲","大洋洲","非洲","北美洲","南美洲"]
			}
		},
		onLoad(){
			//获取默认数据
			pagedata.apidata.get((state,res)=>{
				if(state === 'success'){
					console.log(res);
					this.countryArr = res.data;
				}
			},'/requirement/destination/countries/欧洲');
		},
		methods:{
			//点击时改变洲和季节的状态
			changeType:function(type){
				this.sType = type;
			},
			//更改默认的洲
			changeContinent:function(item){
				this.defaultName = item;
				pagedata.apidata.get((state,res)=>{
					if(state === 'success'){
						console.log(res);
						this.countryArr = res.data;
					}
				},'/requirement/destination/countries/'+item);
			}
		}
	}
</script>

<style >
	.s-con{background: #f2f2f2;}
	.s-title{display: flex; flex-direction: row; justify-content: space-around;}
	.s-title .active{border-bottom: 3px solid  #445356;}
	.s-text-outer{
		background: #cbcaca;
		font-size: 14px;
		
		line-height: 50px;
		text-align: center;
		display: flex;
		justify-content: space-around;
		padding-top:10px;
		padding-bottom:10px;
	}
	.s-text{padding-left:10px; padding-right:10px;color:#fff; height: 30px;line-height: 30px;
	border-radius: 5px;
	}
	.ac{background: #878e90; }
	.s-country{display: flex; flex-wrap: wrap; justify-content: space-around;}
	.s-country view{border:1px solid #ccc; padding:3px 15px; margin:5px ; border-radius: 30px;}
</style>
