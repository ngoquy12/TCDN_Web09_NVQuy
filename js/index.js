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
// Ẩn form chi tiết nhân viên
function hiddenForm() {
    let closeElement = document.querySelector('.m-popup');
    closeElement.style.display = "none";
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

let undbClick = document.querySelector('.m-popup');
function unDoubleClick() {
    undbClick.style.display = "none";
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
let dialogSave = document.querySelector('.m-employee-question');
function showDialogQuestion() {
    dialogSave.style.display = 'block';
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




$(document).ready(function () {
    new EmployeePage();
});

var EmpEnum = {
    FormMode: {
        Add: 1
    },
};


class EmployeePage {
    // Cờ check mode khi gửi dữ liệu. VD: thêm, sửa,...
    formMode = EmpEnum.FormMode.Add;
    constructor() {
        this.setupEvent();
        this.loadData();
    }

    // Setup các sự kiện trong trang
    setupEvent() {
        try {
            // Gán con trỏ this
            let self = this;

            /**********************************************
             * Xử lý các sự kiện liên quan đến checkbox
             * 1. Người dùng tích check all
             */
            // 2. Người dúng tích 1 dòng
            $(document).on('change', '.m-input-checkbox', function () {
                // Làm nổi bật dòng đang tích
                let trElement = $(this).parents('tr');
                if ($(this).prop('checked')) {
                    trElement.addClass('checked');
                } else {
                    trElement.removeClass('checked');
                }

                // Nếu bỏ tích 1 dòng thì bỏ tích check all
                if (!$(this).prop('checked')) {
                    $('.m-input-checkall').prop('checked', false);
                }
            });
            // 3. Làm nổi bật dòng người người dùng click trên bảng
            $(document).on('click', '.m-tr', function () {
                const focusElement = $(this);
                $('.m-tr').each(function () {
                    if ($(this) !== focusElement && !$(this).find('.m-input-checkbox').prop('checked')) {
                        $(this).removeClass('checked');
                    }
                });
                focusElement.addClass('checked');
            });

            /**
             * Các sự kiện đóng mở combo box
             * 1. Mở và đóng combo box chọn số bản ghi
             */
            $('.m-select-record').click(function () {
                let top = $(this).offset().top;
                let left = $(this).offset().left;
                let arrowElement = $('.m-icon-arrow-dropdown');
                $('.m-combo-dropdown-panel').css({
                    top: top - 170,
                    left: left - 167,
                    display: '',
                });

                if (arrowElement.hasClass('m-dropdown-close')) {
                    arrowElement.addClass('m-dropdown-open');
                    arrowElement.removeClass('m-dropdown-close');
                } else {
                    arrowElement.addClass('m-dropdown-close');
                    arrowElement.removeClass('m-dropdown-open');
                    $('.m-combo-dropdown-panel').css({ display: 'none' });
                }
            });
            // 2. Mở và đóng combo box chọn phòng ban
            $('.m-select-department').click(function () {
                let top = $(this).offset().top;
                let left = $(this).offset().left;
                if ($('.m-combo-menu').hasClass('m-open')) {
                    $('.m-combo-menu').removeClass('m-open').hide();
                } else {
                    $('.m-combo-menu')
                        .addClass('m-open')
                        .css({
                            top: top + 33,
                            left: left - 359,
                            'min-width': 392,
                        })
                        .show();
                }
            });
            // 3. Người dùng chọn phòng ban
            $(document).on('click', '.m-menu-items-tr', function () {
                let department = $(this).data('object');
                $('input[name="DepartmentId"]').val(department.DepartmentId);
                $('input[name="DepartmentName"]').val(department.DepartmentName);
                $('.m-combo-menu').removeClass('m-open').hide();
            });


            /**
             * Các sự kiện trên dropdown: Nhân bản, Xóa, Ngừng sử dụng
             * 1. Người dúng mở dropdown
             */
            $(document).on('click', '.m-dropdown-icon-emp', function () {
                localStorage.setItem('empId', $(this).parents('tr').data('id'));
                $('.m-dropdown-emp').css({
                    top: $(this).offset().top + 20,
                    left: $(this).offset().left + 40,
                });
                $('.m-dropdown-emp').show();
            });
            // 2. Người dùng ẩn dropdown
            $('body').click(function () {
                $('.m-dropdown-emp').hide();
            });



        } catch (error) {
            console.log(error);
        }
    }

    /**
     * So sánh 2 object
     * Author: Phạm Văn Linh (11/06/2022)
     */
    objectEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        // Check số lượng key của 2 object
        if (keys1.length !== keys2.length) {
            return false;
        }

        // Check lần lượt các value
        for (const key of keys1) {
            const val1 = object1[key];
            const val2 = object2[key];
            const areObjects = this.isObject(val1) && this.isObject(val2);

            if ((areObjects && !objectEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
                return false;
            }
        }

        return true;
    }
    isObject(object) {
        return object != null && typeof object === 'object';
    }




    loadData() {
        // Gọi API lấy giữ liệu nhân viên
        $.ajax({
            type: 'GET',
            url: 'https://amis.manhnv.net/api/v1/Employees',
            success: function (response) {
                // debugger;
                // Xử lý dữ liệu
                const allEmployees = response;
                // Lọc nhân viên theo tìm kiếm
                var employees = allEmployees.filter((emp) => {
                    return emp.EmployeeCode.includes($('.m-search-emp').val()) || emp.EmployeeName.includes($('.m-search-emp').val());
                });
                // Xử lý dữ liệu sau khi load được data
                handleData(employees, 10, 1);

                // Đổ dữ liệu ra table
                function handleData(employees, perPage, page) {
                    try {
                        // Làm trống table
                        $('.m-tbody').empty();
                        // Render danh sách nhân viên
                        for (let i = (page - 1) * perPage; i < (page - 1) * perPage + perPage; i++) {
                            const emp = employees[i];

                            if (emp) {
                                var dob = emp.DateOfBirth;
                                if (dob) {
                                    dob = new Date(dob);
                                    // Lấy ngày
                                    let date = dob.getDate();
                                    date = date < 10 ? `0${date}` : date;
                                    // Lấy tháng
                                    let month = dob.getMonth() + 1;
                                    month = month < 10 ? `0${month}` : month;
                                    // Lấy năm
                                    let year = dob.getFullYear();

                                    dob = `${date}/${month}/${year}`;
                                }

                                var trHTML = $(`<tr class="m-tr" ondblclick="doubleClick()">
                                <td class="m-out-left-white-16"></td>
                                <td class="m-td m-td-multi" style="left: 16px">
                                    <label class="m-table-checkbox">
                                        <input type="checkbox" class="m-input-checkbox" ondblclick="unDoubleClick()"/>
                                        <span class="m-checkbox">
                                            <span class="m-checkbox-inner">
                                                <div
                                                    class="m-icon-16 m-icon-checkbox-active"
                                                ></div>
                                            </span>
                                        </span>
                                    </label>
                                </td>
                                <td class="m-td m-td-emp-code">${emp.EmployeeCode ? emp.EmployeeCode : ''}</td>
                                <td class="m-td">${emp.EmployeeName ? emp.EmployeeName : ''}</td>
                                <td class="m-td">${emp.GenderName ? emp.GenderName : ''}</td>
                                <td class="m-td" style="text-align: center;">${dob ? dob : ''}</td>
                                <td class="m-td">${emp.EmployeePosition ? emp.EmployeePosition : ''}</td>
                                <td class="m-td">${emp.IdentityNumber ? emp.IdentityNumber : ''}</td>
                                <td class="m-td">${emp.DepartmentName ? emp.DepartmentName : ''}</td>
                                <td class="m-td">${emp.BankAccountNumber ? emp.BankAccountNumber : ''}</td>
                                <td class="m-td">${emp.BankName ? emp.BankName : ''}</td>
                                <td class="m-td">${emp.BankBranchName ? emp.BankBranchName : ''}</td>
                                <td class="m-td">${emp.BankProvinceName ? emp.BankProvinceName : ''}</td>
                                <td class="m-td m-td-widget" style="right: 30px" ondblclick="unDoubleClick()">
                                    <div class="m-dropdown">
                                        <button class="m-dropdown-type-feature m-dropdown-btn-text m-edit-employee" onclick="showFormUpEmp()">
                                            <div class="m-btn-text">Sửa</div>
                                        </button>
                                        <button class="m-dropdown-type-feature m-dropdown-btn-icon m-dropdown-icon-emp">
                                            <div class="m-btn-text">
                                                <div class="m-icon-16 m-icon-arrow-down-blue"></div>
                                            </div>

                                        </button>
                                    </div>
                                </td>
                                <td class="m-out-right-white-30"></td>
                                <td class="m-out-right-grey-30"></td>
                            </tr>`);
                                $(trHTML).data('object', emp);
                                $(trHTML).data('id', emp.EmployeeId);
                                $('.m-tbody').append(trHTML);
                            }
                        }

                    } catch (error) {
                        console.log(error);
                    }
                }

                //Hiênr thị chọn số bản  ghi

                $('.m-combo-box-item').click(function () {
                    $('.m-combo-box-item').each(function () {
                        $(this).removeClass('m-item-highlight');
                    });
                    $(this).addClass('m-item-highlight');
                    $('.m-icon-arrow-dropdown').addClass('m-dropdown-close');
                    $('.m-icon-arrow-dropdown').removeClass('m-dropdown-open');
                    $('.m-combo-input').val($(this).html());
                    $('.m-combo-dropdown-panel').css({ display: 'none' });
                    handleData(employees, parseInt($(this).data('total')), 1);
                });

            },
            error: function () {
                debugger;
            },
        });

        // Gọi API lấy dữ liệu phòng ban
        $.ajax({
            type: 'GET',
            url: 'https://amis.manhnv.net/api/v1/Departments',
            success: function (response) {
                // debugger
                const departments = response;
                $('.m-departments-list').empty();
                for (const department of departments) {
                    var trHTML = $(`
                    <tr class="m-menu-items-tr">
                        <td class="m-menu-items-td" style="width: 100px; text-align: left"><span>${department.DepartmentCode ? department.DepartmentCode : ''}</span></td>
                        <td class="m-menu-items-td" style="width: 250px; text-align: left"><span>${department.DepartmentName}</span></td>
                    </tr>
                    `);
                    $(trHTML).data('object', department);
                    $('.m-departments-list').append(trHTML);
                }
            },
            error: function () {
                debugger;
            },
        });
    }
}

