$(function(){
	var audio=$("#audio").get(0);
	var $audio=$("#audio");
	$(".play-op").on("click",function(){
		if(audio.paused){
			audio.play()
		}else{
			audio.pause()
		}
	})
	$audio.on("play",function(){
		$(".play-op").addClass("pause-op")
	})
	$audio.on("pause",function(){
		$(".play-op").removeClass("pause-op")
	})
	///音量设置
		var $mute=$('.mini-player .mute')
		var $volumeOp=$('.mini-player .volume-op');
		var $currentVol=$('.mini-player .current-volume');
		var $indicator=$('.mini-player .indicator');
		$mute.on('click',function(){
			if(!$(this).attr('ov')){
				$(this).attr('ov',audio.volume);
				audio.volume=0
			}else{
             audio.volume=$(this).attr('ov');
             $(this).removeAttr('ov')
			}
			
			
		})
		$volumeOp.on('click',function(e){
			audio.volume=e.offsetX/$(this).width()
		})
		$indicator.on('click',function(e){
          e.stopPropagation();
		})
		$indicator.on('mousedown',function(e){
		e.stopPropagation();
			$volumeOp.addClass('moving')
			var left=$volumeOp.offset().left;
			var width=$volumeOp.width()
			$(document).on('mousemove',function(e){
			var	v=(e.pageX-left)/width
			v=(v>1)?1:v;
			v=(v<0)?0:v;
				audio.volume=v

			})
		})
		$(document).on('mouseup',function(){
			$volumeOp.removeClass("moving");
			$(document).off('mousemove')
		})
		$audio.on('volumechange',function(){
			if(audio.volume===0){
              $mute.addClass("active")
			}else{
				 $mute.removeClass("active")
			}
			var v=audio.volume*$volumeOp.width();
			$currentVol.width();
			$indicator.css({left:v-$indicator.width()/2})
		})

		//进度条
		var $chang=$(".chang");
		var $dang=$(".dangqian");
		var $dian=$(".dian");

		$audio.on("timeupdate",function(){
			var w=audio.currentTime/audio.duration*$chang.width();
		    $dang.width(w+$dian.width()/2)
		    $dian.css("left",w)
		})
})