$(function(){

});
$("#company,#username,#telphone,#email,#dispositbank,#cardnumber,#address,#reciveperson,#ratepaying").focus(function(){
    $(this).css("color","#555")
});
$("#company,#username,#dispositbank,#address,#reciveperson").blur(function(){
    $this=$(this).val();
    isNull($this);
    validatorAll($(this));
});
$("#telphone").blur(function(){
    $this=$(this).val();
    checkMobile($this);
    validatorAll($(this));
});
$("#email").blur(function(){
    $this=$(this).val();
    checkEmail($this);
    validatorAll($(this));
});
$("#cardnumber").blur(function(){
    $this=$(this).val();
    checkCard($this);
    validatorAll($(this));
});
$("#ratepaying").blur(function(){
    $this=$(this).val();
    checkRate($this);
    validatorAll($(this));
});
$("#submit-btn").click(function(){
    var company=$("#company").val();
    var username=$("#username").val();
    var telphone=$("#telphone").val();
    var email=$("#email").val();
    var dispositbank=$("#dispositbank").val();
    var cardnumber=$("#cardnumber").val();
    var address=$("#address").val();
    var reciveperson=$("#reciveperson").val();
    var ratepaying=$("#ratepaying").val();
/*    var oklength=$("#contacts input").length;*/
    var isNull=["company","username","telphone","email","dispositbank","cardnumber","address","reciveperson","ratepaying"];
    for(var i=0;i<isNull.length;i++){
        if($("#"+isNull[i]).val()==""){
            checkValidator=false;
            $("#"+isNull[i]).focus();
            break;
            /*判断文字颜色是否为红色*/
        }else if($("#"+isNull[i]).css("color")=='rgb(255, 0, 0)') {
            checkValidator=false;
            $("#"+isNull[i]).focus();
            break;
        }else {
            checkValidator=true;
        }
    }
    if($("#agreeAll").is(":checked") && checkValidator){
        $.ajax({
            type: "post",
            url:"/api/cooperation",
            data: JSON.stringify({
                "company":company,
                "username":username,
                "telphone":telphone,
                "email":email,
                "dispositbank":dispositbank,
                "cardnumber":cardnumber,
                "address":address,
                "reciveperson":reciveperson,
                "ratepaying":ratepaying
            }),
            dataType: "json",
            success: function(data){
                if(data.error==0){
                    $("#cooperationForm").val("");
                    $("#errorMsg").text("提交成功，稍后会有工作人员联系，谢谢！")
                }else if(data.error==1){
                    $("#errorMsg").text("此公司已和我们合作，请重新填写资料，谢谢！")
                }else {
                    $("#errorMsg").text("提交失败，请重新提交！")
                }
            }
        });
    }
});
//查看产品介绍
/*function lookProduct(obj){
    var ids=obj.id;
    window.location.href="http://show.iwangneng.com/onlineVideo/"+ids;
}*/
/*判断是否是电子邮件*/
function checkEmail(str){
    var re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(re.test(str)){
        checkValidator=true;
    }else{
        checkValidator=false;
    }
}
/*判断是否是电话号码*/
function checkMobile(str) {
    var re =/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    var patrn=/^[0-9]{1,20}$/;
    if (re.test(str)&&patrn.test(str)) {
        checkValidator=true;
    } else {
        checkValidator=false;
    }
}
/*判断是否是银行卡号*/
function checkCard(str){
    var re = /(^\d{15}$)|(^\d{18}$)|(^\d{19}$)/;
    if(re.test(str)){
        checkValidator=true;
    }else{
        checkValidator=false;
    }
}
/*判断是否是纳税人识别号*/
function checkRate(str){
    var re = /(^\d{9})+([a-zA-Z0-9])+$/;
    if(re.test(str) && str.length==15||str.length==18 ||str.length==20){
        checkValidator=true;
    }else{
        checkValidator=false;
    }
}
/*判断是否为空*/
function isNull(str){
    if(str.length>0){
        checkValidator=true;
    }else{
        checkValidator=false;
    }
}
/*判断是否正确*/
function validatorAll(obj){
    if(checkValidator){
        obj.css("color","#555");
    }else {
        obj.css({"color":"red"});
    }
}