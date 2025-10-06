const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  console.log(url);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status === "all") {
        url.searchParams.delete("status");
      } else {
        url.searchParams.set("status", status);
      }
      // to redirect to the new url
      window.location.href = url.href;
    });
  });
}

// form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    console.log(e);
    // to prevent the default action of the form(reloading the page)
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
// end of form search

// pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination.length > 0) {
  let url = new URL(window.location.href);
  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      if (page) {
        url.searchParams.set("page", page);
      } else {
        url.searchParams.delete("page");
      }
      // Redirect to the new URL with the page parameter
      window.location.href = url.href;
    });
  });
}
// end of pagination

// checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
  inputCheckAll.addEventListener("click", () => {
    const isChecked = inputCheckAll.checked;
    if (isChecked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });
  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      if (countChecked === inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// end checkbox multi

const formChangMulti = document.querySelector("[form-change-multi]");
if (formChangMulti) {
  formChangMulti.addEventListener("submit", (e) => {
    const inputsId = formChangMulti.querySelectorAll(
      "input[name='id']:checked"
    );
    e.preventDefault();
    const checkBoxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = checkBoxMulti.querySelectorAll(
      "input[name='id']:checked"
    );
    const type = e.target.elements.type.value;
    if (type === "selected-delete") {
      const isConfirmed = confirm(
        "Are you sure to change the status of selected items?"
      );
      if (!isConfirmed) return;
    }
    if (inputChecked.length > 0) {
      const intputIds = formChangMulti.querySelector("input[name='ids']");
      const ids = [];

      inputChecked.forEach((input) => {
        if (type === "change-position") {
          const positionInput = input
            .closest("tr")
            .querySelector("input[name='position']");
          ids.push(`${input.value}:${positionInput.value}`);
        } else {
          ids.push(input.value);
        }
      });
      console.log(ids.join(","));
      intputIds.value = ids.join(",");
      formChangMulti.submit();
    }
  });
}

// delete items
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
  const formDelete = document.querySelector("#form-delete-item");
  const path = formDelete.getAttribute("data-path");

  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirmed = confirm("Are you sure to delete this item?");
      if (isConfirmed) {
        const id = button.getAttribute("data-id");
        const action = path + `/${id}?_method=DELETE`;
        formDelete.action = action;
        formDelete.submit();
      }
    });
  });
}

//  end delete items

// show alert
// show alert
const showAlerts = document.querySelectorAll("[show-alert]");
if (showAlerts.length > 0) {
  showAlerts.forEach((alert) => {
    const time = parseInt(alert.getAttribute("data-time")) || 3000;

    // Auto hide sau thời gian
    setTimeout(() => {
      alert.classList.add("hiden-alert");
    }, time);

    // Nút đóng thủ công
    const closeAlert = alert.querySelector("[close-alert]");
    if (closeAlert) {
      closeAlert.addEventListener("click", () => {
        alert.classList.add("hiden-alert");
      });
    }
  });
}
// end show alert
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}

// sort
const sort =document.querySelector("[sort]");
if(sort){
    let url = new URL(window.location.href);
    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");
    
    sortSelect.addEventListener("change", (e) => {
        const value = e.target.value;
        const [sortKey, sortValue] = value.split("_");
        if(sortKey && sortValue){
            url.searchParams.set("sortKey", sortKey);
            url.searchParams.set("sortValue", sortValue);
        }
        window.location.href = url.href;
});
 // Khi bấm nút "Đặt lại"
  if (sortClear) {
    sortClear.addEventListener("click", () => {
      url.searchParams.delete("sortKey");
      url.searchParams.delete("sortValue");
      window.location.href = url.href;
    });
  }

  // ✅ Giữ lại lựa chọn sau khi reload trang
  const currentSortKey = url.searchParams.get("sortKey");
  const currentSortValue = url.searchParams.get("sortValue");
  if (currentSortKey && currentSortValue) {
    const currentValue = `${currentSortKey}_${currentSortValue}`;
    sortSelect.value = currentValue;
  }
}
// end of sort

