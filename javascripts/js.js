var lzc = {};

lzc.id = function(id){
	return typeof id === 'object' ? id : document.getElementById(id);
};

lzc.tagName = function(tagName, oParent){
	return (oParent || document).getElementsByTagName(tagName);
};

lzc.css = function(obj, attr, value){
	if(arguments.length == 2){
		var style = obj.style,
			currentStyle = obj.currentStyle;
		if(typeof attr === 'string')return currentStyle ? currentStyle[attr] : getComputedStyle(obj, false)[attr];
		for(var propName in attr)propName == 'opacity' ? (style.filter = "alpha(opacity=" + attr[propName] + ")", style.opacity = attr[propName] / 100) : style[propName] = attr[propName]; 
	}else if(arguments.length == 3){
		switch(attr){
			case "width":
			case "height":
			case "paddingTop":
			case "paddingRight":
			case "paddingBottom":
			case "paddingLeft":
			case "top":
			case "right":
			case "bottom":
			case "left":
			case "marginTop":
			case "marginRigth":
			case "marginBottom":
			case "marginLeft":
				obj.style[attr] = value + "px";
				break;
			case "opacity":
				obj.style.filter = "alpha(opacity=" + value + ")";
				obj.style.opacity = value / 100;
				break;
			default:
				obj.style[attr] = value
		}
	}
};

lzc.extend = function(destination, source){
	for (var propName in source) destination[propName] = source[propName];
	return destination
};

lzc.animation = function(obj, json, fnEnd){
	clearInterval(obj.timer);
	obj.iSpeed = 0;
	fnEnd = lzc.extend({
		type: "buffer",
		callback: function() {}
	}, fnEnd);
	obj.timer = setInterval(function(){
		var iCur = 0,
			iStop = true;
		for(var propName in json){
			iCur = parseFloat(lzc.css(obj, propName));
			propName == 'opacity' && (iCur = Math.round(iCur * 100));
			switch(fnEnd.type){
				case 'buffer':
					obj.iSpeed = (json[propName] - iCur) / 5;
					obj.iSpeed = obj.iSpeed > 0 ? Math.ceil(obj.iSpeed) : Math.floor(obj.iSpeed);
					json[propName] == iCur || (iStop = false, lzc.css(obj, propName, iCur + obj.iSpeed));
					break;
				case 'elasticity':
					obj.iSpeed += (json[propName] - iCur) / 1;
					obj.iSpeed *= 0.75;
					Math.abs(json[propName] - iCur) <= 1 &&  Math.abs(obj.iSpeed) <= 1 ? lzc.css(obj, propName, json[propName]) : lzc.css(obj, propName, json[propName]) || (iStop = false, lzc.css(obj, propName, iCur + obj.iSpeed));
					break;
				case 'accelerate':
					obj.iSpeed = obj.iSpeed + 5;
					iCur >= json[propName] ? lzc.css(obj, propName, json[propName]) : lzc.css(obj, propName, json[propName]) || (iStop = false, lzc.css(obj, propName, iCur + obj.iSpeed));
				break;
			}
		}
		if(iStop){
			clearInterval(obj.timer);
			obj.timer = null;
			obj.iSpeed = 0;
			fnEnd.callback();	
		}
	},30);
};

window.onload = function(){
	
	
	var oBox = lzc.id('box');
	var oBoxUl = lzc.tagName('ul',oBox)[0];	
	var oBottomLoad = lzc.id('bottomLoad');
	var iData = [];	
	var iImgLoad = 17;
	var iLoaded = 1;
	var sList = [
			'<li><span class="img"><img src="images/1.jpg" /><em class="fun"><span class="like"><em>6291</em>我喜欢</span><span class="review"><em>608</em>评论</span></em></span><span class="tit"><dfn class="ico"><img src="images/ico1.jpg" /></dfn><cite class="con"><code class="user"><em class="time">02月19日 19:28</em>兔兔兔美酱</code>唯美裸粉色</cite></span></li>',
			'<li><span class="img"><img src="images/2.jpg" /><em class="fun"><span class="like"><em>4916</em>我喜欢</span><span class="review"><em>319</em>评论</span></em></span><span class="tit"><dfn class="ico"><img src="images/ico2.jpg" /></dfn><cite class="con"><code class="user"><em class="time">02月19日 12:34</em>赵欣贇vi..</code>#潮品 潮范 潮流社##yun主编 推荐# #yun主编 推荐# 超可爱的衬衣。。蝴蝶结领还有蕾丝边边。。</cite></span></li>',
			'<li><span class="img"><img src="images/3.jpg" /><em class="fun"><span class="like"><em>5393</em>我喜欢</span><span class="review"><em>185</em>评论</span></em></span><span class="tit"><dfn class="ico"><img src="images/ico3.jpg" /></dfn><cite class="con"><code class="user"><em class="time">02月23日 17:06</em>谁比谁靠谱</code>#不靠谱姑娘大联盟# 浅色的宽松牛仔裤</cite></span></li>',
			'<li><span class="img"><img src="images/4.jpg" /><em class="fun"><span class="like"><em>3274</em>我喜欢</span><span class="review"><em>121</em>评论</span></em></span><span class="tit"><dfn class="ico"><img src="images/ico4.jpg" /></dfn><cite class="con"><code class="user"><em class="time">02月20日 17:29</em>理布包</code>#【甜蜜的一家】# 超显瘦牛仔裤 ~~·</cite></span></li>',
			'<li><span class="img"><img src="images/5.jpg" /><em class="fun"><span class="like"><em>3784</em>我喜欢</span><span class="review"><em>186</em>评论</span></em></span><span class="tit"><dfn class="ico"><img src="images/ico5.jpg" /></dfn><cite class="con"><code class="user"><em class="time">02月24日 14:57</em>丹逆儿</code>#糖果"色"翻天# 扣子很特别 </cite></span></li>',
			'<li><span class="img"><img src="images/6.jpg" /><em class="fun"><span class="like"><em>3025</em>我喜欢</span><span class="review"><em>117</em>评论</span></em></span><span class="tit"><dfn class="ico"><img src="images/ico6.jpg" /></dfn><cite class="con"><code class="user"><em class="time">02月12日 18:34</em>艾Elaine</code>喜欢这样的感觉 </cite></span></li>',
			'<li><span class="img"><img src="images/7.jpg" /><em class="fun"><span class="like"><em>1156</em>我喜欢</span><span class="review"><em>113</em>评论</span></em></span><span class="tit"><dfn class="ico"><img src="images/ico7.jpg" /></dfn><cite class="con"><code class="user"><em class="time">02月21日 11:39</em>娜nnrose </code>VC秋装新款推荐某大牌精致长西装设计款西装 女 中长款小西装外套 暗号：7788团 团价：110不包 截团日期：3.21 更多团购请点击http://meilishuo.com/u/EABv0r 【七七八八团】</cite></span></li>',
			'<li><span class="img"><img src="images/8.jpg" /><em class="fun"><span class="like"><em>1059</em>我喜欢</span><span class="review"><em>104</em>评论</span></em></span><span class="tit"><dfn class="ico"><img src="images/ico8.jpg" /></dfn><cite class="con"><code class="user"><em class="time">02月19日 16:38</em>vvvi酱</code>仙。</cite></span></li>',
			'<li><span class="img"><img src="images/9.jpg" /><em class="fun"><span class="like"><em>3356</em>我喜欢</span><span class="review"><em>160</em>评论</span></em></span><span class="tit"><dfn class="ico"><img src="images/ico9.jpg" /></dfn><cite class="con"><code class="user"><em class="time">02月14日 16:06</em>夏雪冬融</code>#灿烂的色彩# ~~</cite></span></li>',
			'<li><span class="img"><img src="images/10.jpg" /><em class="fun"><span class="like"><em>1218</em>我喜欢</span><span class="review"><em>53</em>评论</span></em></span><span class="tit"><dfn class="ico"><img src="images/ico10.jpg" /></dfn><cite class="con"><code class="user"><em class="time">02月24日 17:20</em>大大大敏</code>#无尽的购物清单# 韩国Partysu薄纱蓬蓬裙 超仙梦幻长裙</cite></span></li>',
			'<li><span class="img"><img src="images/11.jpg" /><em class="fun"><span class="like"><em>820</em>我喜欢</span><span class="review"><em>44</em>评论</span></em></span><span class="tit"><dfn class="ico"><img src="images/ico11.jpg" /></dfn><cite class="con"><code class="user"><em class="time">02月19日 16:12</em>Balla刘雨..</code>Mmuses内衣淘宝旗舰店推出情人节特惠活动。 买内衣送水晶饰品，还有很多超值的活动优惠。 爱美的女孩儿们可以再情人节这天精心打扮给心爱的他一个惊喜哦~ 内在美穿的漂漂亮亮的女孩子才是最懂爱自己的女孩子~</cite></span></li>',
			'<li><span class="img"><img src="images/12.jpg" /><em class="fun"><span class="like"><em>650</em>我喜欢</span><span class="review"><em>52</em>评论</span></em></span><span class="tit"><dfn class="ico"><img src="images/ico12.jpg" /></dfn><cite class="con"><code class="user"><em class="time">02月19日 18:26</em>fangmimi</code>小西装</cite></span></li>',
			'<li><span class="img"><img src="images/13.jpg" /><em class="fun"><span class="like"><em>2424</em>我喜欢</span><span class="review"><em>120</em>评论</span></em></span><span class="tit"><dfn class="ico"><img src="images/ico13.jpg" /></dfn><cite class="con"><code class="user"><em class="time">02月24日 16:27</em>甜絲絲</code>#每个女孩都有名媛梦#</cite></span></li>',
			'<li><span class="img"><img src="images/14.jpg" /><em class="fun"><span class="like"><em>1886</em>我喜欢</span><span class="review"><em>89</em>评论</span></em></span><span class="tit"><dfn class="ico"><img src="images/ico14.jpg" /></dfn><cite class="con"><code class="user"><em class="time">02月24日 18:20</em>小乌兰</code>#我爱小清新#</cite></span></li>',
			'<li><span class="img"><img src="images/15.jpg" /><em class="fun"><span class="like"><em>2268</em>我喜欢</span><span class="review"><em>79</em>评论</span></em></span><span class="tit"><dfn class="ico"><img src="images/ico15.jpg" /></dfn><cite class="con"><code class="user"><em class="time">02月24日 18:06</em>小小小也美</code>#"小小小也美"喜欢的衣服# 、、</cite></span></li>',
			'<li><span class="img"><img src="images/16.jpg" /><em class="fun"><span class="like"><em>1357</em>我喜欢</span><span class="review"><em>100</em>评论</span></em></span><span class="tit"><dfn class="ico"><img src="images/ico16.jpg" /></dfn><cite class="con"><code class="user"><em class="time">02月20日 19:29</em>totona</code>#日系玛巨克magic# 绝对美型。。。大爱！</cite></span></li>'
	];
	
	for(i=0;i<16;i++){iData.push(i)}
	//加载所有资源
	for(i=1;i<iImgLoad;i++){
		(function (i){
			var oNewImg=new Image();
			oNewImg.onload=function(){
				if(++iLoaded==iImgLoad)oload();
			};
			oNewImg.src='images/'+i+'.jpg';
		})(i);
	}
	
	function oload(){
		iData.sort(function(){return Math.random() > 0.5 ? -1 : 1;});
		for(var len=iData.length,i=0;i<len;i++){
			oBoxUl.innerHTML += sList[iData[i]];
			waterfall();
		}
	}
	
	//瀑布流
	function waterfall(){
		var oBoxLi = oBox.getElementsByTagName('li');
		for(var len=oBoxLi.length,i=0;i<len;i++){
			if(i%4 == 0){
				i == 0 ? oBoxLi[i].style.top = '0px' : oBoxLi[i].style.top = oBoxLi[i-4].offsetHeight + oBoxLi[i-4].offsetTop + 8 + 'px';
				oBoxLi[i].style.left = '0px';
			}else if(i%4 == 1){
				i == 1 ? oBoxLi[i].style.top = '0px' : oBoxLi[i].style.top = oBoxLi[i-4].offsetHeight + oBoxLi[i-4].offsetTop + 8 + 'px';
				oBoxLi[i].style.left = oBoxLi[0].offsetWidth + 16 + 'px';
			}else if(i%4 == 2){
				i == 2 ? oBoxLi[i].style.top = '0px' : oBoxLi[i].style.top = oBoxLi[i-4].offsetHeight + oBoxLi[i-4].offsetTop + 8 + 'px';
				oBoxLi[i].style.left = (oBoxLi[0].offsetWidth + 16) * 2 + 'px';
			}else if(i%4 == 3){
				i == 3 ? oBoxLi[i].style.top = '0px' : oBoxLi[i].style.top = oBoxLi[i-4].offsetHeight + oBoxLi[i-4].offsetTop + 8 + 'px';
				oBoxLi[i].style.left = (oBoxLi[0].offsetWidth + 16) * 3 + 'px';
			}
			oBottomLoad.style.display = 'none';
			lzc.animation(oBoxLi[i],{opacity:100});
		}
	}
	
	//滚动
	window.onscroll = function(){
		var oScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(document.documentElement.clientHeight+oScrollTop == document.documentElement.scrollHeight){ //窗口高度等于滚动条高度
			oBottomLoad.style.top = document.documentElement.scrollHeight-50 + 'px';
			oBottomLoad.style.display = 'block';
			setTimeout(oload,30);
		}
	}
};