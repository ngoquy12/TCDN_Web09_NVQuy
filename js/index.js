// load lại trang
$(window).on('load', function (event) {
    $('body').removeClass('preloading');
    $('.m-loading-svg').delay(1000).fadeOut('fast');
});


/**
 * Hiển thị icon loading
 * @param {string} name Ten 
 * @returns Ten nhan vien
 * Author: NNQUY(ngay)
 */
function loading() {
    let loadElement = document.querySelector('.m-loading-svg');
    loadElement.style.display = "block";
    setTimeout(function () {
        loadElement.style.display = "none";
    }, 1000);
}

// Hiển thị form chi tiết nhân viên
function showForm() {
    loading();
    setTimeout(function () {
        let nodeElement = document.querySelector('.m-popup');
        nodeElement.style.display = "block";
        //Thay đổi heading của popup khi thay đổi trạng thái
        let headingPopup = document.querySelector('.m-title');
        headingPopup.innerText = "Thêm mới nhân viên";
        document.querySelector('.m-input-code').focus();
    }, 1000);
}

function showFormUpEmp() {
    loading();
    setTimeout(function () {
        let nodeElement = document.querySelector('.m-popup');
        nodeElement.style.display = "block";
        //Thay đổi heading của popup khi thay đổi trạng thái
        let headingPopup = document.querySelector('.m-title');
        headingPopup.innerText = "Cập nhật nhân viên";
        document.querySelector('.m-input-code').focus();
    }, 1000);
}

// Taọ phím tắt
window.onload = function () {
    document.onkeyup = function (e) {
        switch (e.which) {
            case 45:
                showFormUpEmp();
                break;
            case 27:
                let closeElement = document.querySelector('.m-popup');
                closeElement.style.display = "none";
                break;
            case 46:
                let dialogDelete = document.querySelector('.m-delete-warning');
                dialogDelete.style.display = "block";
                break;
            case 13:
                let showForm = document.querySelector('.m-popup');
                showForm.style.display = "block";
                document.querySelector('.m-input-code').focus();
                break;
        }
    }
}

// Stop tabIndex

function stopTabIndex(event) {
    event.preventDefault();
}

//double click

let dbClick = document.querySelector('.m-popup');
function doubleClick() {
    loading();
    setTimeout(function () {
        dbClick.style.display = "block";
        //Thay đổi heading của popup khi thay đổi trạng thái
        let headingPopup = document.querySelector('.m-title');
        headingPopup.innerText = "Thông tin nhân viên";
        document.querySelector('.m-input-code').focus();
    }, 1000);
}



//Reload trang
function reload() {
    location.reload();
}

//  Gán css top để phần header trong body trượt khi scroll

$('.m-content-body').scroll(function () {
    $('.m-content-header').css({ top: -$(this).scrollTop() });
});
// Gán chiều rộng cho phần phân trang
$('.m-pagination').css({ width: $('.m-table').width() });


//show dialog warning

let dialogWarn = document.querySelector('.m-employee-danger');
function showDialog() {
    dialogWarn.style.display = 'block';
}

// show dialog question

function showDialogQuestion() {
    $('.m-employee-question').show();
}

// hidden dialog

let dialogDanger = document.querySelector('.m-employee-danger');
function hiddenDialogDanger() {
    dialogDanger.style.display = 'none';
}

let dialogQuestion = document.querySelector('.m-employee-question');
function hiddenDialogQuestion() {
    dialogQuestion.style.display = 'none';
}
let dialogDelete = document.querySelector('.m-delete-warning');
function hiddenDialogDelete() {
    dialogDelete.style.display = 'none';
}
