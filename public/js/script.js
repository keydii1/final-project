const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length>0){
    let url = new URL (window.location.href);
    console.log(url);
    buttonStatus.forEach((button)=>{
    button.addEventListener("click", ()=>{
        const status = button.getAttribute("button-status");
        if(status === "all"){
            url.searchParams.delete("status");
         }
        else {
            url.searchParams.set("status", status);
        }
        // to redirect to the new url
        window.location.href = url.href;
     } );
});
}