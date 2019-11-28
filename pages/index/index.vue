<template>
	<view class="content">
		<mySwiper :swiperArr="swiperArr"/>
		<view>推荐</view>
		<!--推荐的循环数据渲染-->
		<view v-for="(item,index) in tuijianArr" :key="index" :id="index" class="item">
			<image  :src="showArr[index] === true?item.proPicUrl:load"></image>
		</view>
		
	</view>
</template>

<script>
	//引入 获取数据的封装
	import pagedata from '../../utils/getdata';
	
	//引入轮播图组件
	import mySwiper from '../../components/main/myswiper/myswiper';
	export default {
		data() {
			return {
				swiperArr:[],
				tuijianArr:[],
				load:"/static/img/load.gif",
				height:0, //可视区的高度
				showArr:[]//列表中的数据是否显示的数组，里面的数据如果为true，表示是显示状态，如果为 false表示为不显示状态
			}
		},
		onLoad() {//页面加载
			//获取轮播的数据
			pagedata.apidata.get((state,res)=>{
				if(state === 'success'){//数据获取到了
					//console.log(res);
					//将获取的数据保存到data
					this.swiperArr = res.data;//vue 语法
				}
			},'/product/banner/getBySeller/4bc4027c645343f09a964b5c2e9f875b');
					
			//获取推荐的数据
			pagedata.apidata.post((state,res)=>{
				if(state === 'success'){//数据获取到了
					//console.log(res);
					//将获取的数据保存到data
					this.tuijianArr = res.data;//vue 语法
					//console.log(this.tuijianArr);
					
					this.tuijianArr.forEach((item,index)=>{
						this.showArr[index] = false;
						
						
					})
				}
			},'/product/product/getProductRecommendUser',{desc: false,orderBy: "top",pageNow: 1,pageSize: 20,seller_user_id: "4bc4027c645343f09a964b5c2e9f875b"});		
			
			
			//获取页面的高度
			let _this = this;
			uni.getSystemInfo({
				success:function(res){
					//console.log(res);
					_this.height = res.windowHeight
				}
			})	
		},
		onReady(){
			//默认显示的图片
			setTimeout(()=>{
				this.showImg();
			},300);
		},
		onPageScroll(){//滚动条事件
			//console.log('111');
			//调用显示图片函数
			this.showImg();
		},
		methods: {
			//滚动时，显示图片的函数
			showImg(){
				let group = this.tuijianArr;
				let height = this.height;
				//某一个图片对应顶部的高度  ,下面的这句话表示获取某个元素的信息
				uni.createSelectorQuery().selectAll('.item').boundingClientRect((ret)=>{
					console.log(ret);
					ret.forEach((item,index)=>{
						if(item.top <= height){
							//this.showArr[index] = true;
							//如果我们对数据的数组中的某个属性进行修改时，并没有触发页面的重新加载，可以使用 $set
							//https://www.jianshu.com/p/71b1807b1815
							//更改的数组名，下标，更改的值 
							if(this.showArr[index] == false){
								this.$set(this.showArr,index,true);
							}		
							
						}
					})
					console.log(this.showArr);
					
				}).exec();
			}
		},
		components:{
			mySwiper
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
