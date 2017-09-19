//校验主题包
var global_validator_theme="126";
$(document).ready(function(){
$(document).keydown(function(event){
			var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
			if(keyCode == 13){
				$("#autoEnterSubmit").click();
			}
	});
});
 
//更改上传图片
function uploadImg(obj,type,certCustId,saveType,certificationType) {
		  //var type = obj.id;
		  if(obj.value!=""&&!checkImgFile(obj.value)){
			  $("#upIcon_error").show();
			  $("#upIcon_error").text("上传文件格式错误，请上传JPG/PNG/BMP/GIF格式");				 			 
				return;
		  } 
		  $.ajaxFileUpload({
		  		//跟具Type得到不同的上传文本的ID
               url:global_root+'/enterprise/register/updateUploadImages.tml?uploadType='+type+'&certCustId='+certCustId+'&saveType='+saveType+'&certificationType='+certificationType,             //需要链接到服务器地址
               secureuri: false,  
               fileElementId: type,  
               dataType: 'json',  
               success: function(data, status) {
            	   if(data && data.status == 'BIG_SIZE'){
            		   alert("上传图片过大,请重新上传!");			                		   
            		   return ;
            	   }					               
            	   $("#"+data.uploadType+"Img").attr("src",global_root+"/common/showImg.html?imgId="+data.picId+"&rand="+Math.random());
            	   $("#"+data.uploadType+"NewId").val(data.picId);
	               
               }, 		                     
               error: function(data, status, e) {  
            	   if(e && e.message && typeof e.message == "string"){
            		   alert("上传图片过大,请重新上传!");
            	   } else {
            		   alert(e);
            	   }
                   
               }
		   });
			 

	}

//图片上传限制
  function upIconValid(name,maxWidth,maxHeight) {
     if(maxWidth==undefined || maxWidth==null){
    	maxWidth=10000;
     }
     if(maxHeight==undefined || maxHeight==null){
    	maxHeight=10000;
     }
	 var image = new Image();	    	  
     image.onload=function(){
    	 var width = image.width;
    	 var height = image.height;    
         var errorMsg='';          
	     if(width>maxWidth || height>maxHeight ){	       
	    	 errorMsg='请上传 '+maxWidth+'*'+maxHeight+'px 图片 ';
	     }         
	     if(errorMsg!=''){
	    	 $("#"+name+"_error").show();
	    	 $("#"+name+"_error").text(errorMsg);				 			 			 
	     }else{
	    	 $("#"+name+"_error").hide();
	    	 $("#"+name+"_error").text("");
	     }
     };
     image.src = $("#"+name+"Img").attr("src");
 	     	    
   } 

     //保存图片
    function saveImg(obj,type,attachType,maxWidth,maxHeight) {
    
		  if(obj.value!="" && !checkImgFile(obj.value)){
			  $("#upIcon_error").show();
			  $("#upIcon_error").text("上传文件格式错误，请上传JPG/PNG/BMP/GIF格式");				 			 
				return;
		   }  
		  //AjaxStart();		
	      $.ajaxFileUpload({
	  		//跟具Type得到不同的上传文本的ID
               url:global_root+'/common/uploadImages.html?uploadType='+type+'&attachType='+attachType,    
               secureuri: false,  
               fileElementId: type,  
               dataType: 'json',  
               success: function(data, status) {
            	   var errorMsg='';
            	   if( typeof data =='string' || data.status == '03'){           	 
          	    	   errorMsg='上传发送错误，请联系管理员';
            	   }           	              	   
            	   if(data.status == '01'){
            		   errorMsg="请上传图片!";          		   
            	   }
            	   if(data.status == '02'){
            		   errorMsg="上传图片太大!";          		               	 
            	   }  
            	   if(errorMsg!=''){
            		   $("#"+obj.name+"_error").show();
          	    	   $("#"+obj.name+"_error").text(errorMsg);
          	    	   return;
            	   }            	   
        	   	   $("#"+obj.name+"Id").val(data.picId);
            	   $("#"+obj.name+"Img").attr("src",global_root+"/common/showImg.html?imgId="+data.picId);
            	   $("#"+obj.name+"Img").parent().css("display","block");
            	   upIconValid(obj.name,maxWidth,maxHeight);           	   
            	 	//AjaxStop();
               },  
               error: function(data, status, e) {
            	   if(e && e.message && typeof e.message == "string"){
            		   alert("上传图片发送未知错误,请联系管理员!");
            	   } else {
            		   alert(e);
            	   }
                   //AjaxStop();
               }
	       });
	 
   }

  
  function checkImgFile(obj) {
		if (obj != "") {
			var pos = obj.lastIndexOf(".");
			var valid_sign = 1;
			if (pos != -1) {
				var s = obj.substring(pos + 1, obj.length);
				if (s.toLowerCase() != "gif" && s.toLowerCase() != "jpg"
						&& s.toLowerCase() != "jpeg" && s.toLowerCase() != "png" && s.toLowerCase() != "bmp") {
					valid_sign = -1;
				}
			} else {
				valid_sign = -1;
			}
			if (valid_sign == -1) {
				return false;
			} else {
				return true;
			}
		}
	} 
  
if(!CookieEnable()){	
	alert("请您启用浏览器Cookie功能或更换浏览器");
}
function CookieEnable(){        

    var result=false;         
    //if(navigator.cookieEnabled)return true;     IE下都是true       
    document.cookie = "testcookie=yes;";                 
    var cookieSet = document.cookie;            
    if (cookieSet.indexOf("testcookie=yes") > -1){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);            
        document.cookie = 'testcookie' + "=" + '' + "; expires=" + exp.toGMTString();//删除测试cookie
        result=true;  
    }          
    return result;   
} 

