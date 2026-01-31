import { elAddForm, elCardsBox, elEditForm, elToastTemplate } from "./html_elements.mjs";
import { mainRequest } from "./main_app.mjs";
import { addFormButtonDisabler, deleteYesButtonDisabler , editFormButtonDisabler} from "./ui_write.mjs";

function deleteAnimal(id) {
    document.querySelector(".js-delete-yes-btn").addEventListener("click",(evt)=>{
        deleteYesButtonDisabler(true);
        toastUI("Request sending","warning");
        fetch("https://yngpnqpbzzlmwuwjnxwe.supabase.co/rest/v1/animals?id=eq."+id,{
        method:"DELETE",headers:{
            "Authorization":`Bearer ${localStorage.getItem("access_token")}`,
            "apikey":"sb_publishable_cD9wYz0WXFEuAJ8vJ5zHBg_QwBwkHYN"
        }
        })
        .then(res=>{
            if(res.ok) {
                document.querySelector("#delete-modal").classList="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full hidden";
                document.querySelector("#delete-modal").setAttribute("aria-modal","false");
                document.querySelector("#delete-modal").removeAttribute("role");
                document.body.classList.remove("overflow-hidden");
                document.querySelector("wbr").nextElementSibling.remove();
                toastUI("Deleted successfuly","success");
                deleteYesButtonDisabler(false);
                elCardsBox.innerHTML="";
                mainRequest();
            }
        })
        .catch(err=>{
            console.log(err);
            toastUI("Error... try again","error");
        });
    });
};
let editID=null;
function editAnimal(id) {
    editID=id;
    document.querySelector(`[data-card-id='${id}']`).querySelector('.js-animal-edit-btn').innerHTML=`
        <svg aria-hidden="true" role="status" class="w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>`;
    document.querySelector(`[data-card-id='${id}']`).querySelector('.js-animal-edit-btn').disabled=true;
    fetch("https://yngpnqpbzzlmwuwjnxwe.supabase.co/rest/v1/animals?id=eq."+id,{
        method:"GET",
        headers:{"apikey":"sb_publishable_cD9wYz0WXFEuAJ8vJ5zHBg_QwBwkHYN"}
    })
    .then(res=>res.json()).then(res=>{
        if(res=="not found") {
            toastUI("Error.. try again");
        } else {
            console.log(res);
            res=res[0]
            elEditForm.querySelector(`[name='name']`).value=res.name?res.name:"No data";
            elEditForm.querySelector(`[name='category']`).value=res.category?res.category:"No data";
            elEditForm.querySelector(`[name='speed']`).value=res.speed?res.speed:"0";
            elEditForm.querySelector(`[name='soundText']`).value=res.soundText?res.soundText:"No data";
            elEditForm.querySelector(`[name='year']`).value=res.year?res.year:"0";
            elEditForm.querySelector(`[name='weight']`).value=res.weight?res.weight:"0";
            elEditForm.querySelector(`[name='color']`).value=res.color?res.color:"No data";
            elEditForm.querySelector(`[name='habitat']`).value=res.habitat?res.habitat:"No data";
            elEditForm.querySelector(`[name='isWild']`).value=String(res.isWild)?String(res.isWild):"true";
            document.querySelector('[data-modal-toggle="edit-modal"]').click()
            document.querySelector(`[data-card-id='${id}']`).querySelector('.js-animal-edit-btn').disabled=false;
            document.querySelector(`[data-card-id='${id}']`).querySelector('.js-animal-edit-btn').innerHTML=`<svg class="pointer-events-none" width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
            </svg><span>Edit</span>`;
        }
    });
};

elEditForm.addEventListener("submit",(evt)=>{
evt.preventDefault();
const emptyInputs = [];
elEditForm.querySelectorAll("input").forEach(el=>{if(el.value.trim()==='')emptyInputs.push(el.name)});
if(emptyInputs.length!=0) {
toastUI(`Please fill ${emptyInputs[0]} input!`,"warning");
elEditForm.querySelector(`[name='${emptyInputs[0]}']`).focus();
} else {
editFormButtonDisabler(true);
const newAnimalData = {};
new FormData(elEditForm).forEach((value,key)=>{
newAnimalData[key]=value;
});
toastUI("Request sending...","warning");
fetch("https://yngpnqpbzzlmwuwjnxwe.supabase.co/rest/v1/animals?id=eq."+editID,{
method:"PATCH",
headers: {
"apikey":"sb_publishable_cD9wYz0WXFEuAJ8vJ5zHBg_QwBwkHYN",
"Content-Type":"application/json",
"Authorization":`Bearer ${localStorage.getItem("access_token")}`
}, body:JSON.stringify(newAnimalData)
}).then(res=>{
console.log(res);

document.querySelector("#edit-modal").classList="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full hidden";
document.querySelector("#edit-modal").setAttribute("aria-modal","false");
document.querySelector("#edit-modal").removeAttribute("role");
document.body.classList.remove("overflow-hidden");
document.querySelector("wbr").nextElementSibling.remove();
toastUI("Animal edited successfully","success");
elCardsBox.innerHTML="";
editFormButtonDisabler(false);
elEditForm.reset();
mainRequest();
}).catch(()=>{
toastUI("Error... try again","error");
editFormButtonDisabler(false);
});
}
});


elAddForm.addEventListener("submit",(evt)=>{
    evt.preventDefault();
    const emptyInputs = [];
    elAddForm.querySelectorAll("input").forEach(el=>{if(el.value.trim()==='')emptyInputs.push(el.name)});
    if(emptyInputs.length!=0) {
        toastUI(`Please fill ${emptyInputs[0]} input!`,"warning");
        elAddForm.querySelector(`[name='${emptyInputs[0]}']`).focus();
    } else {
        addFormButtonDisabler(true);
        const newAnimalData = {};
        new FormData(elAddForm).forEach((value,key)=>{
            newAnimalData[key]=value;
        });
        toastUI("Request sending...","warning");
        fetch("https://yngpnqpbzzlmwuwjnxwe.supabase.co/rest/v1/animals",{
            method:"POST",
            headers: {
                "apikey":"sb_publishable_cD9wYz0WXFEuAJ8vJ5zHBg_QwBwkHYN",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("access_token")}`
            }, body:JSON.stringify(newAnimalData)
        }).then(res=>{
           return res.json()
        }).then(res=>{
            if(res.ok) {
            document.querySelector("#add-modal").classList="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full hidden";
            document.querySelector("#add-modal").setAttribute("aria-modal","false");
            document.querySelector("#add-modal").removeAttribute("role");
            document.body.classList.remove("overflow-hidden");
            document.querySelector("wbr").nextElementSibling.remove();
            toastUI("New animal added","success");
            elCardsBox.innerHTML="";
            addFormButtonDisabler(false);
            elAddForm.reset();
            mainRequest();
            } else {
                toastUI("Please re-login","warning");
                setTimeout(()=>{
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("user_name");
                    window.location.href=window.location.origin;
                },3000);
            }
        }).catch(err=>{
            console.log(err);
            toastUI("Error... try again","error");
            addFormButtonDisabler(false);
        });
    }
});

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

export {
    deleteAnimal,
    editAnimal
}
