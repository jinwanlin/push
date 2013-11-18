/*!
 * 图片瀑布流
 * 
 * Author: jinwanlin
 * Date: 2012-06-21 17:54
 * 
 */


/*******需要设置元素的宽和内外边距************/

var width = 0;

var marginTop = 8;
var marginRight = 8;
var marginBottom = 8;
var marginLeft = 8;

var paddingTop = 0;
var paddingRight = 0;
var paddingBottom = 0;
var paddingLeft = 0;


/********************************************/

var h1 = 0;
var h2 = 0;
var h3 = 0;
var h4 = 0;


function push(lis){
	for(var i=0; i<lis.length; i++){
		var li = lis[i];
		li = $(li);//html对象转jquery对象
		
		if(i==0){
			initMarginPadding(li);
		}
		
		var h = li.height();
		
		var top_left_row = getTopLeftRow();
		li.css("top", top_left_row[0]);
		li.css("left", top_left_row[1]);
		
		saveRowTop(top_left_row[2], h);
	}
}

function getTopLeftRow(){
	var top = h1;
	var row = 1;  //该放在第几列
	
	if(h2 < top){
		top = h2;
		row = 2;
	}
	
	if(h3 < top){
		top = h3;
		row = 3;
	}
	
	if(h4 < top){
		top = h4;
		row = 4;
	}
	
	var left = (parseInt(row)-1) * (parseInt(width)+parseInt(paddingLeft)+parseInt(paddingRight)+parseInt(marginLeft)+parseInt(marginRight));
	
	return [top, left, row];
}


function saveRowTop(row, h){
	if(row == 1){
		h1 = parseInt(h1) + parseInt(h) + parseInt(marginTop) + parseInt(marginBottom) + parseInt(paddingTop) + parseInt(paddingBottom);
	}else if(row == 2){
		h2 = parseInt(h2) + parseInt(h) + parseInt(marginTop) + parseInt(marginBottom) + parseInt(paddingTop) + parseInt(paddingBottom);
	}else if(row == 3){
		h3 = parseInt(h3) + parseInt(h) + parseInt(marginTop) + parseInt(marginBottom) + parseInt(paddingTop) + parseInt(paddingBottom);
	}else if(row == 4){
		h4 = parseInt(h4) + parseInt(h) + parseInt(marginTop) + parseInt(marginBottom) + parseInt(paddingTop) + parseInt(paddingBottom);
	}
}

function initMarginPadding(li){
	marginTop = li.css("margin-top");
	marginTop = marginTop.substring(0, marginTop.length-2);;
	
	marginRight = li.css("margin-right");
	marginRight = marginRight.substring(0, marginRight.length-2);
	
	marginBottom = li.css("margin-bottom");
	marginBottom = marginBottom.substring(0, marginBottom.length-2);
	
	marginLeft = li.css("margin-left");
	marginLeft = marginLeft.substring(0, marginLeft.length-2);;
	
	
	paddingTop = li.css("padding-top");
	paddingTop = paddingTop.substring(0, paddingTop.length-2);;
	
	paddingRight = li.css("padding-right");
	paddingRight = paddingRight.substring(0, paddingRight.length-2);
	
	paddingBottom = li.css("padding-bottom");
	paddingBottom = paddingBottom.substring(0, paddingBottom.length-2);
	
	paddingLeft = li.css("padding-left");
	paddingLeft = paddingLeft.substring(0, paddingLeft.length-2);;
	
	
	width = li.css("width");
	width = width.substring(0, width.length-2);;
	
	var div = li.parent().parent();
	
//	divtop = div.css("top");
//	divtop = divtop.substring(0, divtop.length-2);;
//	alert(divtop);
	
}