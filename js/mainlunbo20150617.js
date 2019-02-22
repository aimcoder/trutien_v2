/*轮播*/
$(function(){
	lunboFocus('#shop_btn p','#shop_name td',5,'.shop_img .lb_cont1',0,5);//箭头、小图、小图显示数量、大图、小图间距、速度
})
//function lunboFocus(){
function lunboFocus(lb_btn,lb_img_btn_dom,lb_img_btn_num,lb_dd,btn_int,speed){
	if(!lb_btn || !lb_img_btn_dom || !lb_dd) return
	var lb_dd = $(lb_dd); 
	var lb_btn = $(lb_btn);
	var lb_img_btn_dom = lb_img_btn_dom;
	var lb_img_btn = $(lb_img_btn_dom);
	if(!btn_int){btn_int = 0}
	var lb_img_btn_width = lb_img_btn.width() + btn_int;
	var lb_img_box = $("#shop_name");
	lb_img_box.width(lb_img_btn_width*lb_img_btn_num);
	if(!speed){speed = 5000}else{speed *= 1000}
	var re_auto = lb_img_btn.length*(lb_img_btn.width()+btn_int);
	var alpha_img = 1;
	var alpha_img_curr = 1;
	var lb_auto = setInterval(lb_next,speed)
	

	lb_img_btn.first().add(lb_dd.first()).addClass('curr first');
	lb_img_btn.last().add(lb_dd.last()).addClass('last');
	lb_img_btn.css('marginRight',btn_int+'px').fadeTo('fast',alpha_img).siblings('.curr').fadeTo('fast',alpha_img_curr);
	lb_dd.filter('.curr').fadeTo('fast',alpha_img_curr);
	
	var dizeng = lb_img_btn.width() + btn_int;
	lb_img_btn.each(function(i){
		$(this).css('left',btn_int);
		btn_int += dizeng;
	})
	
	lb_img_btn.hover(function(){
		$(this).stop($(this).fadeIn()).fadeTo('fast',alpha_img_curr);
	},function(){
		if(!$(this).is('.curr')){
			$(this).fadeTo('normal',alpha_img);
		}
	}).click(function(){
		$(this).siblings('.curr').removeClass('curr').fadeTo('normal',alpha_img);
		$(this).addClass('curr').fadeTo('normal',alpha_img_curr);
		var n = $(this).index(lb_img_btn_dom);
		lb_dd.filter('.curr').removeClass('curr').hide();
		lb_dd.eq(n).addClass('curr').fadeTo('slow',alpha_img_curr);
	})
	
	lb_btn.first().click(function(){
		lb_prev();
	})
	lb_btn.last().click(function(){
		lb_next();
	})

	function outview(direction){
		var currpos1 = lb_img_box.scrollLeft() - lb_img_btn.outerWidth(true);
		var currpos2 = lb_img_box.scrollLeft() + lb_img_box.width();
		var nnn = lb_img_btn.filter('.curr').index(lb_img_btn_dom);
		if(!((nnn*lb_img_btn_width)> currpos1 && (nnn*lb_img_btn_width) < currpos2)){
			if(direction){
				lb_img_box.animate({
					scrollLeft:lb_img_box.scrollLeft() + lb_img_box.width()
				},300)
			}else{
				lb_img_box.animate({
					scrollLeft:lb_img_box.scrollLeft() - lb_img_box.width()
				},300)
			}	
		}	
	}
	/* animate */
	function lb_prev(){
		if(lb_img_btn.filter('.curr').is('.first')){
			
			lb_img_btn.last().addClass('curr').fadeTo('slow',alpha_img_curr).end().filter('.curr:first').removeClass('curr').fadeTo('slow',alpha_img);
			
			lb_dd.last().addClass('curr').fadeIn('slow').end().filter('.curr:first').removeClass('curr').fadeOut('slow');	
			
			lb_img_box.animate({
				scrollLeft:lb_img_btn.outerWidth(true)*lb_img_btn.last().index(lb_img_btn_dom)
			},re_auto)
				.scrollLeft(lb_img_btn.outerWidth(true)*lb_img_btn.last().index(lb_img_btn_dom));
		}else{
			
			lb_img_btn.filter('.curr').prev().addClass('curr').fadeTo('slow',alpha_img_curr).end().removeClass('curr').fadeTo('slow',alpha_img);
			
			lb_dd.filter('.curr').prev().addClass('curr').fadeIn('slow').end().removeClass('curr').fadeOut('slow');
			
			outview(false)
		}
	}
	function lb_next(){
		if(!lb_dd) return
		if(lb_img_btn.filter('.curr').is('.last')){
			lb_img_btn.first().addClass('curr').fadeTo('slow',alpha_img_curr).end().filter('.curr:last').removeClass('curr').fadeTo('slow',alpha_img);
			lb_dd.first().addClass('curr').fadeIn('slow').end().filter('.curr:last').removeClass('curr').fadeOut('slow');
			lb_img_box.animate({
				scrollLeft:0
			},re_auto);	
		}else{
			lb_img_btn.filter('.curr').next().addClass('curr').fadeTo('slow',alpha_img_curr).end().removeClass('curr').fadeTo('slow',alpha_img);
			lb_dd.filter('.curr').next().addClass('curr').fadeIn('slow').end().removeClass('curr').fadeOut('slow');
			outview(true)
		}
	}
}