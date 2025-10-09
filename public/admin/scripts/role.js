// permission
const tablePermission = document.querySelector("[table-permission]");
if (tablePermission) {
  const buttonSubmit = document.querySelector("[button-submit]");
  if (buttonSubmit) {
    buttonSubmit.addEventListener("click", () => {
      const roles = [];

      const listTh = tablePermission.querySelectorAll("thead th[data-id]");
      listTh.forEach(th => {
        const roleId = th.getAttribute("data-id");
        roles.push({
          id: roleId,
          permissions: []
        });
      });

      const listTr = tablePermission.querySelectorAll("tbody tr[data-name]");
      listTr.forEach(tr => {
        const permissionName = tr.getAttribute("data-name");
        const listInput = tr.querySelectorAll("input[type='checkbox']");

        listInput.forEach((input, index) => {
          if (input.checked) {
            roles[index].permissions.push(permissionName);
          }
        });
      });

      if (roles.length > 0) {
        const formChangePermission = document.querySelector("#form-change-permission");
        const inputPermissions = formChangePermission.querySelector("input[name='permissions']");
        inputPermissions.value = JSON.stringify(roles);
        formChangePermission.submit();
      }
    });
  }
}
// end of permission

// permissionn data default
const dataRecord = document.querySelector("[data-record]");
if(dataRecord){
    const record = JSON.parse(dataRecord.getAttribute("data-record"));
    const tablePermission = document.querySelector("[table-permission]");
    record.forEach((Arecord,index) => {
        const permissions = Arecord.permissions;
        permissions.forEach(permission => {
            const row = tablePermission.querySelector(`tbody tr[data-name='${permission}']`);
            if(row) {
              const input = row.querySelectorAll("input")[index];
              if(input) {
                input.checked = true;
              }
            }
        })
    })
}
// end of permission data default