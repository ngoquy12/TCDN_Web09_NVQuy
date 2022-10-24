
// // window.onload=function(){
// //     initEvent();
// // }

// // validate dữ liệu
// // Thu thập dữ liệu
// // Gọi api thực hiện cất dữ liệu
// // Kiểm tra kết quả trả về-> đưa ra thong báo

// // function validate(){
// //     //Các thông tin cần nhập
// //     //Các thông tin đinh dạng đúng(email)
// //     //Ngày tháng
// // }



// function handelSidebar() {
//     statusSidebar();

// }
// /**
//  * Thu nhỏ sidebar
//  * author:nvquy(19/10/2022)
//  */
// function statusSidebar() {
//     let sidebarTitle = document.querySelectorAll('.m-item-title');
//     //Độ dài các phần tử của sidebar
//     let sideLength = sidebarTitle.length;
//     //Thẻ chứa toàn bộ phần header
//     let menuItem = document.querySelector('.m-menu-item');
//     //logo icon
//     let logoIcon = document.querySelector('.m-logo-icon');
//     //Lặp qua các phần tử của sidebar
//     for (let i = 0; i < sideLength; i++) {
//         if (sidebarTitle[i].style.display === "none") {
//             sidebarTitle[i].style.display = "block";
//             document.querySelector('.m-menu').style.width = "200px";
//             menuItem.classList.remove('m-menu-item-change');

//         } else {
//             sidebarTitle[i].style.display = "none";
//             document.querySelector('.m-menu').style.width = "56px";
//             menuItem.classList.add('m-menu-item-change');

//         }
//     }
// }

// /**
//  * Xử lý dữ liệu trong form
//  * author :nvquy(20/10/2022)
//  * 
//  */
// function validateForm() {
//     //Các thông tin bắt buộc nhập
//     //Láy ra toàn bộ các thông tin bắt buộc nhập
//     inputRequired();
//     //Kiểm tra định dạng emailemail
//     checkEmail();
//     //Kiểm tra định dạng ngày tháng
//     isValidDate();
// }

// /**
//  * Xử lý các thông tin bắt buộc nhập
//  * author:nvquy(20/10/2022)
//  */

// function inputRequired() {
//     let inputRequireds = getElementsWithAttribute("required");
//     for (let input of inputRequireds) {
//         let value = input.value;
//         if (!value) {
//             //Hiển thị boder màu đỏ và hiển thị thông báo lỗi
//             input.classList.add("m-input-error");

//         } else {
//             //Ẩn boder màu đỏ và hiển thị thông báo lỗi
//             input.classList.remove("m-input-error");

//         }
//     }
// }

// /**
//  * Đinh dạng email
//  * author: nvquy(20/10/2022)
//  */
// function checkEmail() {
//     //Lấy ra phần element của input có type là email
//     let email = document.querySelector('input[type="email"]');
//     //Lấy ra giá trị người dùng nhập từ bàn phím
//     let value = email.value;
//     //Kiểm tra người dùng đã nhập dữ liệu hay chưa?
//     if (!value) {
//         email.classList.add('m-input-error');
//         document.querySelector('.m-input-email-error').innerHTML = "&lt;Email&gt; không được để trống";
//     } else {
//         let filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//         if (!filter.test(value)) {
//             document.querySelector('.m-input-email-error').innerHTML = "&lt;Email&gt; chưa đúng định dạng";
//             email.classList.add('m-input-error');
//         }
//         else {
//             email.classList.remove('m-input-error');
//             document.querySelector('.m-input-email-error').style.display = "none";
//         }

//     }
// }


// /**
//  * Định dạng ngày tháng
//  * Author :nvquy(20/10/2022)
//  * @param {string} name : date
//  * @return
//  */

// /**
//  * Lấy ra attributes của các ô input
//  * author: nvquy(20/10/2022)
//  * @param {string} attribute 
//  * @returns 
//  */

// function getElementsWithAttribute(attribute) {
//     let mathchingElements = [];
//     let allElements = document.getElementsByTagName('*');
//     for (let i = 0, n = allElements.length; i < n; i++) {
//         if (allElements[i].getAttribute(attribute) != null) {
//             mathchingElements.push(allElements[i]);
//         }
//     }
//     return mathchingElements;
//}
