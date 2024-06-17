// Button status
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0) {
    let url = new URL(location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if(status) {
                url.searchParams.set("status", status)
            }
            else {
                url.searchParams.delete("status");
            }
            location.href = url.href;
        }) 
    })
}
// End button status

// Form search
const formSearch = document.querySelector("#form-search");
if(formSearch) {
    let url = new URL(location.href);
    formSearch.addEventListener("submit", (e) => {
        // Để k load lại và mất đi trang thái được dùng kết hợp lọc theo trạng thái và tìm kiếm
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if(keyword) {
            url.searchParams.set("keyword", keyword);
        }
        else {
            url.searchParams.delete("keyword");
        }
        location.href = url.href;
    })
}
// End form search

// Pagination 
const pagination = document.querySelectorAll("[button-pagination]");
if(pagination.length) {
    const url = new URL(location.href);
    pagination.forEach(item => {
        item.addEventListener("click", () => {
            const pageNumber = item.getAttribute("button-pagination");
            if(pageNumber == 1) {
                url.searchParams.delete("page");
            }
            else {
                url.searchParams.set("page", pageNumber);
            }
            location.href = url.href;
        })
    })
}
// Pagination End

// Check-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
console.log(checkboxMulti);
if(checkboxMulti) {
    const inputCheckAll = document.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked) {
            inputsId.forEach(button => {
                button.checked = true;
            })
        }
        else {
            inputsId.forEach(button => {
                button.checked = false;
            })
        }
    })
    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked == inputCheckAll.length) {
                inputCheckAll.checked = true;
            }
            else {
                inputCheckAll.checked = false;
            }

        })
    })
}
// Check-multi end

// form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

        const typeChange = e.target.elements.type.value;
        if(typeChange == "delete-all") {
            const isConfirm = confirm("Bạn có chắc muốn xóa không ?");
            if(!isConfirm) {
                return;
            }
        }  


        if(inputsChecked.length) {
            const ids = [];
            const inputIds = document.querySelector("input[name='ids']");

            inputsChecked.forEach(input => {
                const id = input.value;
                if(typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`)
                }
                else {
                    ids.push(id);
                }
            });
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        }
        else {
            alert("Vui lòng chọn ít nhất một sản phẩm");
        }
    })
}
// form change multi end

// Upload image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
}
// Upload image end