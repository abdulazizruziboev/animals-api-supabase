import { cardsWrite,  skeletonWrite } from "./ui_write.mjs";

mainRequest();
function mainRequest() {

    skeletonWrite(true);
    fetch(`https://yngpnqpbzzlmwuwjnxwe.supabase.co/rest/v1/animals?order=id.asc`,{
        method:"GET",headers:{"apikey":"sb_publishable_cD9wYz0WXFEuAJ8vJ5zHBg_QwBwkHYN"}
    })
    .then(response=>response.json())
    .then(response=>{
            cardsWrite(response);
    });
}

export {
    mainRequest
}