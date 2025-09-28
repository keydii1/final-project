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


// form search
const formSearch = document.querySelector(".form-search");
if(formSearch){
    let url = new URL (window.location.href);
    formSearch.addEventListener("submit", (e)=>{
        console.log(e);
        // to prevent the default action of the form(reloading the page)
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword", keyword);
        }else {
            url.searchParams.delete("keyword");
        }
    });
}  
// end of form search