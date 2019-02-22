    var _event={};
        _event.stop_bubble = function(e) {
            e = e || window.event;
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
        };
      
        _event.get_event = function(e) {
            var e = e || window.event;
            var ele = e.target || e.srcElement;
            return ele;
        };
    $(function(){
      if($(".my_select").size() > 0){
        
    
		var $select=$(".my_select"); 
		var len = $('.my_select dd').size();
		var randomMusic = Math.floor(Math.random()*len);

        $select.find("dl").each(function(){
          $(this).css("width",$(this).parent().width());
        });
        $select.find("p").each(function(){
          $(this).css("width",$(this).parent().width()-30);
        });

        

        // height: 200px; overflow-y: auto;
        $select.live("click",function(e){
          _event.stop_bubble(e);
          $select.css("z-index","1");
          $(this).css("z-index","5");
          $select.children("dl").hide();
          $(this).children("dl").show();

          if($(this).children("dl").height()>=144){
            $(this).children("dl").css({
              "height":144,
              "overflow-y":"scroll"
            });
          }else{
            $(this).children("dl").css({
              "height":"auto",
              "overflow-y":"visible"
            });
          }

          var dd=_event.get_event(e)
          if(dd.tagName=="DD"){
            $(dd).parent().hide();
          }
        });

        var musicInit = false

        $select.find("dd").live("click",function(){

			var oVal=$(this).closest("div").find("input").val();
			var nVal=$(this).attr('value');
			$(this).closest("dl").height('auto');
			$(this).attr('checked','checked').siblings().removeAttr('checked');
			

			
			$(this).closest("div").find("input").val($(this).attr('value')).prev().children("span").text($(this).text());
			//$(this).closest("div").find("p").children("span").html($(this).html());
			

			if(oVal!=nVal){
				$(this).trigger('change');
				var links = $(this).attr('link');
				addMusic('music', 100, 16,
					{
						source:links,
						skinColor:'0xf6d9e6',
						autoPlay: musicInit,
						volume:0.3,
						repeat:true
					}
				);
			}

			musicInit = true
			
        }).eq(randomMusic).click();


        $select.find('dd[checked="checked"]').click();

         $select.live('hover',function(event){
          if(event.type=='mouseenter'){
            
          }else{
            $(this).children("dl").hide();
          }
        }) 


        $(document).click(function(){
          $select.children("dl").hide();
        });

      }
    });