import { elLoginForm , elRegisterForm , elToastTemplate } from "./html_elements.mjs";

function authChecker() {
elLoginForm.addEventListener("submit",(evt)=>{
    evt.preventDefault();
    elLoginForm.querySelector("button[type='submit']").addEventListener("click",()=>{
    const emptyInputs = [];
    elLoginForm.querySelectorAll("input").forEach(el=>{if(el.value.trim()=='')emptyInputs.push(el.name)});
    if(emptyInputs.length!=0) {
        toastUI(`Please fill ${emptyInputs[0]}!`,"warning");
        elLoginForm.querySelector(`[name='${emptyInputs[0]}']`).focus();
    } else {
        loginButtonDisabler(true);
        const loginFormData = new FormData(elLoginForm);
        const loginRequestData = {
            email: loginFormData.get("email").trim(),
            password: loginFormData.get("password").trim()
        };
        fetch("https://yngpnqpbzzlmwuwjnxwe.supabase.co/auth/v1/token?grant_type=password",{
            method:"POST",
            headers: {
                "Content-Type":"application/json",
                "apikey":"sb_publishable_cD9wYz0WXFEuAJ8vJ5zHBg_QwBwkHYN"
            }, body:JSON.stringify(loginRequestData)
        }).then(res=>res.json()).then(res=>{
            console.log(res);
            if(res.msg=="Invalid login credentials"){
                toastUI("Username or password wrong!","error");
                loginButtonDisabler(false);
            } else {
                localStorage.setItem("access_token",res.access_token);
                localStorage.setItem("email",res.user['email']);
                toastUI("Login successfully!","success");
                elLoginForm.reset(); loginButtonDisabler(false);
                setTimeout(()=>{location.reload()},2000);
            }
        });
    };}
);
});

elRegisterForm.addEventListener("submit",(evt)=>{
    evt.preventDefault();
    elRegisterForm.querySelector("button[type='submit']").addEventListener("click",()=>{
    const emptyInputs = [];
    elRegisterForm.querySelectorAll("input").forEach(el=>{if(el.value.trim()=='')emptyInputs.push(el.name)});
    if(emptyInputs.length!=0) {
        toastUI(`Please fill ${emptyInputs[0]}!`,"warning");
        elRegisterForm.querySelector(`[name='${emptyInputs[0]}']`).focus();
    } else {
        registerButtonDisabler(true);
        const registerFormData = new FormData(elRegisterForm);
        const registerRequestData = {
            email: registerFormData.get("email").trim(),
            password: registerFormData.get("password").trim()
        };
        fetch("https://yngpnqpbzzlmwuwjnxwe.supabase.co/auth/v1/signup",{
            method:"POST",
            headers: {
                "Content-Type":"application/json",
                "apikey":"sb_publishable_cD9wYz0WXFEuAJ8vJ5zHBg_QwBwkHYN"
            }, body:JSON.stringify(registerRequestData)
        }).then(res=>res.json()).then(res=>{
            if(res.msg=="User already registered"){
                toastUI("Username or password wrong!","error");
                registerButtonDisabler(false);
            } else {
                localStorage.setItem("access_token",res.access_token);
                localStorage.setItem("email",res.user['email']);
                toastUI("Register successfully!","success");
                elRegisterForm.reset(); registerButtonDisabler(false);
                setTimeout(()=>{location.reload()},2000);
            }
        });
    };
    })
});

};

function loginButtonDisabler(bool) {
    if(bool==true) {
        elLoginForm.querySelector("button[type='submit']").innerHTML=`
        <svg aria-hidden="true" role="status" class="w-4 h-4 me-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>`;
        elLoginForm.querySelector("button[type='submit']").disabled=true;
        elLoginForm.querySelector("button[type='submit']").classList.remove("cursor-pointer");
        elLoginForm.querySelector("button[type='submit']").classList.add("cursor-not-allowed");
    } else {
        elLoginForm.querySelector("button[type='submit']").innerHTML=`Login to your account`;
        elLoginForm.querySelector("button[type='submit']").disabled=false;
        elLoginForm.querySelector("button[type='submit']").classList.remove("cursor-not-allowed");
        elLoginForm.querySelector("button[type='submit']").classList.add("cursor-pointer");
        elLoginForm.reset()
    };
};

function registerButtonDisabler(bool) {
    if(bool==true) {
        elRegisterForm.querySelector("button[type='submit']").innerHTML=`
        <svg aria-hidden="true" role="status" class="w-4 h-4 me-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>`;
        elRegisterForm.querySelector("button[type='submit']").disabled=true;
        elRegisterForm.querySelector("button[type='submit']").classList.remove("cursor-pointer");
        elRegisterForm.querySelector("button[type='submit']").classList.add("cursor-not-allowed");
    } else {
        elRegisterForm.querySelector("button[type='submit']").innerHTML=`Login to your account`;
        elRegisterForm.querySelector("button[type='submit']").disabled=false;
        elRegisterForm.querySelector("button[type='submit']").classList.remove("cursor-not-allowed");
        elRegisterForm.querySelector("button[type='submit']").classList.add("cursor-pointer");
        elRegisterForm.reset()
    };
};

function toastUI(text="This is toast",status="warning") {
let cloneToast = elToastTemplate.cloneNode(true).content;
if(status=="warning") {
    cloneToast.querySelector(".js-toast-icon").innerHTML=`<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg>`;
    cloneToast.querySelector(".js-toast-icon").classList.remove("text-fg-danger","bg-danger-soft");
    cloneToast.querySelector(".js-toast-icon").classList.remove("text-fg-success","bg-success-soft");
    cloneToast.querySelector(".js-toast-icon").classList.add("text-fg-warning","bg-warning-soft");
} else if(status=="error") {
    cloneToast.querySelector(".js-toast-icon").innerHTML=`<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>`;
    cloneToast.querySelector(".js-toast-icon").classList.remove("text-fg-warning","bg-warning-soft");
    cloneToast.querySelector(".js-toast-icon").classList.remove("text-fg-success","bg-success-soft");
    cloneToast.querySelector(".js-toast-icon").classList.add("text-fg-danger","bg-danger-soft");
} else if(status=="success") {
    cloneToast.querySelector(".js-toast-icon").innerHTML=`<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/></svg>`;
    cloneToast.querySelector(".js-toast-icon").classList.remove("text-fg-warning","bg-warning-soft");
    cloneToast.querySelector(".js-toast-icon").classList.remove("text-fg-danger","bg-danger-soft");
    cloneToast.querySelector(".js-toast-icon").classList.add("text-fg-success","bg-success-soft");
}
cloneToast.querySelector(".js-toast-text").textContent=text;
document.body.append(cloneToast);
setTimeout(()=>{
document.body.querySelector("[role='alert']").classList.add("opacity-[0]");
},2500);
setTimeout(()=>{
document.body.querySelector("[role='alert']").remove();
},3250);
};

export {authChecker};