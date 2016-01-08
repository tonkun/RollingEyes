$(function(){
	$(document).bind('mousemove',function(e){
		var mouse = {
			xpos: e.pageX,
			ypos: e.pageY
		},
		$log = $('.log');
		$('.eye').each(function(){
			var $eye = $(this),
			$iris = $eye.find('i'),
			eyeSize = $eye.width(),
			eyeRadius = eyeSize/2,
			eye = {
				x: $eye.offset().left+eyeRadius,
				y: $eye.offset().top+eyeRadius,
			},
			iris = {
				size: $iris.width(),
				boundary: eyeSize*0.05,
				xpos: eye.x-mouse.xpos,
				ypos: eye.y-mouse.ypos
			},
			epicenter = eyeRadius-(iris.size/2)-iris.boundary,
			radian = Math.atan(iris.ypos/iris.xpos);
			if(iris.xpos < 0){
				radian += Math.PI;
			}else{
				if(iris.ypos < 0){
					radian += Math.PI*2;
				}
			}
			var xBoundary = -Math.sin(radian+(0.5*Math.PI)),
			yBoundary = Math.cos(radian+(0.5*Math.PI)),
			irisXpos,
			irisYpos,
			irisScale = 0.8,
			irisCenter = false,
			irisSkewX,
			irisSkewY;
			if(Math.abs(iris.xpos) < Math.abs(xBoundary) * epicenter){
				irisXpos = -iris.xpos;
				irisCenter = true;
			}else{
				irisXpos = xBoundary * epicenter;
			}
			if(Math.abs(iris.ypos) < Math.abs(yBoundary) * epicenter){
				irisYpos = -iris.ypos;
				irisCenter = true;
			}else{
				irisYpos = yBoundary * epicenter;
			}
			if(irisCenter && $eye.hasClass('focused')){
				irisSkewX = 0.2-Math.abs(iris.xpos/(xBoundary*epicenter)*0.2);
				irisSkewY = 0.2-Math.abs(iris.ypos/(yBoundary*epicenter)*0.2);
				irisScale = 0.8 + Math.min(irisSkewX,irisSkewY);
			}else{
				irisScale = 0.8;
			}
			$iris.css({
				'transform': 'rotate(' + radian + 'rad) scaleX(' + (irisScale) + ')',
				'margin-left': irisXpos,
				'margin-top': irisYpos
			});
		});
	});
	$('.eye').bind('mouseover',function(e){
		$(this).addClass('focused').siblings().removeClass('focused');
	});
});
$(window).on('load resize',function(){
	$('.clone').remove();
	var $eye = $('.eye'),
	eyeW = $eye.width()+parseInt($eye.css('margin'))*2,
	windowW = $(window).width(),
	windowH = $(window).height(),
	amount = Math.floor(windowW/eyeW)*Math.floor(windowH/eyeW);
	for(var i=0;i<amount-1;i++){
		$eye.clone().addClass('clone').insertBefore($eye);
	}
});