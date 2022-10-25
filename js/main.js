
/**
 * Xử lý dữ liệu trong form
 * author :nvquy(20/10/2022)
 * 
 */

function validateForm() {
    //Các thông tin bắt buộc nhập
    //Láy ra toàn bộ các thông tin bắt buộc nhập
    let inputRequireds = getElementsWithAttribute("required");
    for (let input of inputRequireds) {
        let value = input.value;
        if (!value) {
            //Hiển thị boder màu đỏ và hiển thị thông báo lỗi
            input.classList.add("m-input-error");

        } else {
            //Ẩn boder màu đỏ và hiển thị thông báo lỗi
            input.classList.remove("m-input-error");

        }
    }

    //Kiểm tra tính hợp lệ của email
    let isEmail = getElementsWithAttribute("isEmail");
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 

    if (isEmail.value.match(filter)) {
        console.log('Định dạng email chưa đúng');
    }
    else {
        console.log('Định dạng email  đúng');
    }
}

/**
 * Lấy ra attributes của các ô input
 * author: Ngọ Văn Quý(20/20/2022)
 * @param {string} attribute 
 * @returns 
 */

function getElementsWithAttribute(attribute) {
    let mathchingElements = [];
    let allElements = document.getElementsByTagName('*');
    for (let i = 0, n = allElements.length; i < n; i++) {
        if (allElements[i].getAttribute(attribute) != null) {
            mathchingElements.push(allElements[i]);
        }
    }
    return mathchingElements;
}