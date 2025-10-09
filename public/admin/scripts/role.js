// permission
const table = document.querySelector("[table-permission]");
if (table) {
    const buttonSubmit = document.querySelector("[button-submit]");
    if (buttonSubmit) {
        buttonSubmit.addEventListener("click", () => {
            let permissions = [];
            const rows = table.querySelectorAll("[data-name]");

            rows.forEach(row => {
                const name = row.getAttribute("data-name");
                const inputs = row.querySelectorAll("input");

                // Nếu là hàng chứa ID
                if (name === "id") {
                    inputs.forEach(input => {
                        const id = input.getAttribute("value");
                        permissions.push({
                            id: id,
                            permissions: [] // ✅ thêm mảng rỗng
                        });
                    });
                } else {
                    // Các hàng còn lại (view, create, edit, delete...)
                    inputs.forEach((input, index) => {
                        const checked = input.checked;
                        if (checked && permissions[index]) {
                            permissions[index].permissions.push(name);
                        }
                    });
                }
            });

            console.log(permissions);
            if(permissions.length > 0) {
                const formChangePermission = document.querySelector("#form-change-permission");
                const inputPermissions = formChangePermission.querySelector("input[name='permissions']");
                inputPermissions.value = JSON.stringify(permissions);
                formChangePermission.submit();
        }     });
    }
}
// end of permission
