const buttonChangeStatus = document.querySelectorAll("[button-change-status]")

if(buttonChangeStatus.length >0){
    const formChangStatus = document.querySelector("#form-change-status")
    const path = formChangStatus.getAttribute("data-path")
                console.log(path);

    buttonChangeStatus.forEach((button) => {
        button.addEventListener("click", () =>{
            const currrentStatus = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            let statusChange =currrentStatus == "active" ? "inactive":"active"
            const action = path + `/${statusChange}/${id}?_method=PATCH`
            formChangStatus.action = action;
            formChangStatus.submit();
        });
    });
}