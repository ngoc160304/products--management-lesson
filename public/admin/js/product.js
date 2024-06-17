// Button change status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length) {
    const form = document.querySelector("#form-change-status");
    buttonsChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("id-product");
            let status = button.getAttribute("status");
            status = status === "active" ? "inactive" : "active";
            const path = form.getAttribute("data-path") + `${status}/${id}?_method=PATCH`;
            console.log(path);
            form.action = path;
            form.submit();
        })
    })    
}
// Button change status end

// Button delete product
const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete.length) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này ?");
            if(isConfirm) {
                const id = button.getAttribute("data-id");
                const action = `${path}${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        })
    })
}
// Button delete product end

