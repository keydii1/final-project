const buttonChangeStatus = document.querySelectorAll("[button-change-status]")

if(buttonChangeStatus.length > 0){
    const formChangStatus = document.querySelector("#form-change-status")
    const path = formChangStatus.getAttribute("data-path")

    buttonChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const currentStatus = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            let statusChange = currentStatus == "active" ? "inactive" : "active"
            const action = path + `/${statusChange}/${id}?_method=PATCH`
            formChangStatus.action = action;
            formChangStatus.submit();
        });
    });
}