
var CommonConfig = {redirectCode:100001};


function invokeAjaxJson(url, data, sussCallBack, options){
	var tmpOpts={
		errCallBack: (options && options.errCallBack)?options.errCallBack:undefined,
		complCallBack: (options && options.complCallBack)?options.complCallBack:undefined,
		async: (options && options.isSync)?false:true,
		dataType: (options && options.isJsonp)?"jsonp":"json",
	    isIframe: (options && options.isIframe)?true:false,
	    type: (options && options.isPost)?"POST":"GET"
	};
	
	$.ajax({
	      type: tmpOpts.type,
	      url: url,
	      data: data,
	      dataType: tmpOpts.dataType,
	      jsonp: "callback",
	      async: tmpOpts.async,
	      success: function(tmp){
	    	  var ret = tmp;
	    	  if (typeof(tmp) == "string"){
	    		  try{
		    		ret = JSON.parse(tmp);
		    	  }catch(err){
		    	  }
	    	  }
	    	  if(ret.code == CommonConfig.redirectCode){
	    		  var redirectUrl = $.trim(ret.result);
	    		  var location = window.location.href;
	    		  if(redirectUrl){
	    			  if (redirectUrl.indexOf("?") != -1) {
	    					redirectUrl += "&location=" + location;
	    			  } else {
	    					redirectUrl += "?location=" + location;
	    			  }
	    			  if(tmpOpts.isIframe){
	    				  redirectParent(redirectUrl);
	    			  }else{
			    		  window.location.href = redirectUrl;
			    	  }
			      }
			  }else{
				  if(sussCallBack){
					  sussCallBack(tmp);
				  }
			  }
	      },
	      error: function(XHR,errMsg,exp){
			  if(tmpOpts.errCallBack){
				  tmpOpts.errCallBack(XHR,errMsg,exp);
			  }
	      },
	      complete:function(XHR, TS){
			  if(tmpOpts.complCallBack){
				  tmpOpts.complCallBack(XHR, TS);
			  }
	      }
	});
}

function redirectParent(href){
	window.parent.location.href=href;
}