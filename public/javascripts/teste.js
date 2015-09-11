var agar = "Dano";

function validate(){
    var pwdField = document.getElementById("pwd");
    var pwdRepeatField = document.getElementById("pwdRepeat")
    if ( pwdField.value == pwdRepeatField.value ){
        console.log("Senhas iguais");
        pwdField.parentElement.className = "form-group has-success";
        pwdRepeatField.parentElement.className = "form-group has-success has-feedback";
    } else {
        console.log("Senhas diferentes");
        pwdField.parentElement.className = "form-group has-error";
        pwdRepeatField.parentElement.className = "form-group has-error has-feedback";
    }
}