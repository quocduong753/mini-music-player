function validator(formSelector) {

    var formElement = document.querySelector(formSelector);
    var inputs = formElement.querySelectorAll('[name][rules]');
    var closeForm = document.querySelector('.form-close');
    var  formRules = {};
    var validatorRules = {
        required: function (value) {
            return value ? undefined : "vui lòng nhập vào mục này";
        },
        email: function (value) {
            regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Vui lòng điền Email hợp lệ";
        },
        min: function(min){
            return function(value){
                return value.length >= min ? undefined : `vui lòng nhập ít nhất ${min} kí tự`;
            }
        },
        isConfirmed: function(value){
            let pass = formElement.querySelector('#password');
            return value == pass.value ? undefined : "Không khớp với mật khẩu vừa nhập";
        }
    }

    if(formElement) {
        // lấy ra và xử lý các thẻ input
        for(var input of inputs){

            var rules = input.getAttribute('rules').split('|');
            for(var rule of rules){

                var isRuleHasValue = rule.includes(':');
                var ruleInfor;

                if(isRuleHasValue){
                    ruleInfor = rule.split(':')
                    rule = ruleInfor[0];
                }
                
                var ruleFunc = validatorRules[rule];
                if(isRuleHasValue){
                    ruleFunc = ruleFunc(ruleInfor[1]);
                }
                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }   
            // Lắng nghe sự kiện để validate
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }

        // Hàm xử lí khi validate có lỗi 
        function handleValidate(event){
            var rules = formRules[event.target.name];
            var errorMessage;
            for(var rule of rules){
                errorMessage = rule(event.target.value);
                if(errorMessage) break;
            }
            if(errorMessage){
                var formGroup = event.target.closest('.form-group');
                if(formGroup){
                    formGroup.classList.add('invalid');
                    let formMessage = formGroup.querySelector('.form-message');
                    if(formMessage){
                        formMessage.innerText = errorMessage;
                    }
                }
            }

            return !errorMessage;
        }

        function handleClearError(event){
            var formGroup = event.target.closest('.form-group');
            if(formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid');
                let formMessage = formGroup.querySelector('.form-message');
                if(formMessage) formMessage.innerText = '';
            }
        }
    }

    // closeForm.onclick = function(){
    //     for(var input of inputs){
    //         handleClearError({target: input});
    //     }
    // }

    // xử lí submit form
    formElement.onsubmit = function(event){
        event.preventDefault();
        let isValid = true;
        for(var input of inputs){
            if(!handleValidate({target: input})) isValid = false;
        }
    }


}