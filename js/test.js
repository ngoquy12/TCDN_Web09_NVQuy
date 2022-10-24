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

 /**
  * Đinh dạng email
  * author: nvquy(20/10/2022)
  */

//  function checkEmail() {
//     //  Lấy ra phần element của input có type là email
//      let email = document.querySelector('input[type="email"]');
//     //  Lấy ra giá trị người dùng nhập từ bàn phím
//      let value = email.value;
//     //  Kiểm tra người dùng đã nhập dữ liệu hay chưa?
//      if (!value) {
//          email.classList.add('m-input-error');
//          document.querySelector('.m-input-email-error').innerHTML = "&lt;Email&gt; không được để trống";
//      } else {
//          let filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//          if (!filter.test(value)) {
//              document.querySelector('.m-input-email-error').innerHTML = "&lt;Email&gt; chưa đúng định dạng";
//              email.classList.add('m-input-error');
//          }
//          else {
//              email.classList.remove('m-input-error');
//              document.querySelector('.m-input-email-error').style.display = "none";
//          }

//      }
//  }




$(document).ready(function () {
    new Employee();
});

class Employee {
    // Cờ check mode khi gửi dữ liệu. VD: thêm, sửa,...
    formMode = EmpEnum.FormMode.Add;
    constructor() {
        this.initEvent();
        this.loadData();
    }

    // Setup các sự kiện trong trang
    initEvent() {
        try {
            // Gán con trỏ this
            let self = this;

            /**********************************************
             * Các sự kiện cần gán css
             * 1. Gán css top để phần header trong body trượt khi scroll
             */
            $('.m-content-body').scroll(function () {
                $('.m-content-header').css({ top: -$(this).scrollTop() });
            });
            // // 2. Gán chiều rộng cho phần phân trang
            $('.m-pagination').css({ width: $('.m-table').width() });

            /**********************************************
             * Xử lý các sự kiện liên quan đến checkbox
             * 1. Người dùng tích check all
             */
            $('.m-input-checkall').click(function () {
                $('.m-input-checkbox').prop('checked', $(this).prop('checked'));
                $('.m-input-checkbox').parents('tr').addClass('checked');
            });
            // 2. Người dúng tích 1 dòng
            $(document).on('change', '.m-input-checkbox', function () {
                // Làm nổi bật dòng đang tích
                let trElement = $(this).parents('tr');
                if ($(this).prop('checked')) {
                    trElement.addClass('checked');
                } else {
                    trElement.removeClass('checked');
                }
                let checkAll = true;
                // Kiểm tra tất cả các checkbox
                $('.m-input-checkbox').each(function () {
                    if (!$(this).prop('checked')) {
                        checkAll = false;
                    }
                });
                // Nếu tất cả đều check thì tích checkall
                if (checkAll) {
                    $('.m-input-checkall').prop('checked', true);
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
             * Các sự kiện liên quan đến popup thêm nhân viên
             * 1. Người dùng chọn thêm mới nhân viên
             */
            $(document).on('click', '.m-button-add-emp', function () {
                self.formMode = EmpEnum.FormMode.Add;
                $.ajax({
                    type: 'GET',
                    url: 'https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode',
                    success: function (response) {
                        // debugger;
                        $('input[name="EmployeeCode"]').val(response);
                        // Lấy object data trên popup
                        let formData = $('#employeeForm')
                            .serializeArray()
                            .reduce(function (obj, item) {
                                obj[item.name] = item.value;
                                return obj;
                            }, {});
                        $('.m-add-popup').data('object', formData);
                    },
                    error: function (response) {
                        debugger;
                        console.log(response);
                    },
                });
                $('input[name="Gender"][value="1"]').prop('checked', true);
                $('.m-add-popup').show();
                $('input[name="EmployeeCode"]').focus();
            });
            // 2. Người dùng ẩn popup qua button X
            $(document).on('click', '.m-close-add-popup', function () {
                // Lấy object data trên popup
                let formData = $('#employeeForm')
                    .serializeArray()
                    .reduce(function (obj, item) {
                        obj[item.name] = item.value;
                        return obj;
                    }, {});
                // Kiểm tra dữ liệu thay đổi
                let dataChange = self.objectEqual(formData, $('.m-add-popup').data('object'));
                if (!dataChange) {
                    $('.m-employee-question .m-content-message').html('Dữ liệu đã bị thay đổi. Bạn có muốn cất không?');
                    // Hiển thị thông báo nếu có dữ liệu đã nhập
                    $('.m-employee-question').show();
                } else {
                    $(this).parents('.m-dialog').hide();
                    $('.m-add-popup input:not([name="Gender"])').val('');
                    $('.m-input-require').removeClass('m-input-error');
                    $('.m-combo-main-content').removeClass('m-input-error');
                }
            });
            // 3. Người dùng ẩn popup qua phím ESC
            $(document).keydown(function (e) {
                if (e.which == 27) {
                    // Lấy object data trên popup
                    let formData = $('#employeeForm')
                        .serializeArray()
                        .reduce(function (obj, item) {
                            obj[item.name] = item.value;
                            return obj;
                        }, {});
                    // Kiểm tra dữ liệu thay đổi
                    let dataChange = self.objectEqual(formData, $('.m-add-popup').data('object'));
                    if (!dataChange) {
                        $('.m-employee-question .m-content-message').html('Dữ liệu đã bị thay đổi. Bạn có muốn cất không?');
                        // Hiển thị thông báo nếu có dữ liệu đã nhập
                        $('.m-employee-question').show();
                    } else {
                        $(this).parents('.m-dialog').hide();
                        $('.m-add-popup input:not([name="Gender"])').val('');
                        $('.m-input-require').removeClass('m-input-error');
                        $('.m-combo-main-content').removeClass('m-input-error');
                    }
                }
            });
            // 4. Hiển thị border màu đỏ cảnh báo người dùng không nhập không hợp lệ
            $(document)
                .on('keyup', 'input.m-input-require', function () {
                    if (!$(this).val()) {
                        $(this).addClass('m-input-error');           
                    } else {
                        $(this).removeClass('m-input-error');
                    }
                })
                .on('keyup', 'input[name="Email"]', function () {
                    $(this).removeClass('m-input-error');
                })
                .on('keyup', '.m-combo-box input', function () {
                    if (!$(this).val()) {
                        $('.m-combo-main-content').addClass('m-input-error');
                    } else {
                        $('.m-combo-main-content').removeClass('m-input-error');
                    }
                });
            // 5. Người dùng chọn cất
            $(document).on('click', '.m-popup-store-btn', function () {
                if (self.formMode === EmpEnum.FormMode.Add) {
                    // Nếu mode là thêm nhân viên
                    self.handleAddEmployee();
                } else if (self.formMode === EmpEnum.FormMode.Edit) {
                    // Nếu mode là sửa thông tin nhân viên
                    self.handleEditEmployee();
                }
            });
            // 6. Sự kiện trên dialog confirm đóng popup thêm nhân viên
            $('.m-employee-question')
                // Người dùng chọn huỷ
                .on('click', '.m-question-cancel', function () {
                    $(this).parents('.m-dialog').hide();
                })
                // Người dùng chọn đóng
                .on('click', '.m-question-close', function () {
                    $(this).parents('.m-dialog').hide();
                    $('.m-add-popup').hide();
                    $('.m-add-popup input:not([name="Gender"])').val('');
                    $('.m-input-require').removeClass('m-input-error');
                    $('.m-combo-main-content').removeClass('m-input-error');
                })
                // Người dùng chọn cất
                .on('click', '.m-question-store', function () {
                    $(this).parents('.m-dialog').hide();
                    $('.m-popup-store-btn').click();
                });
            // 7. Người dùng chọn cất và thêm
            $(document).on('click', '.m-popup-store-and-add-btn', function () {
                if (self.formMode === EmpEnum.FormMode.Add) {
                    self.formMode = EmpEnum.FormMode.SaveAndAdd;
                    // Nếu mode là thêm nhân viên
                    self.handleAddEmployee();
                } else if (self.formMode === EmpEnum.FormMode.Edit) {
                    self.formMode = EmpEnum.FormMode.EditAndAdd;
                    // Nếu mode là sửa thông tin nhân viên
                    self.handleEditEmployee();
                }
                $('.m-add-popup').show();
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

                let empCode = $(this).parents('tr').find('.m-td-emp-code').text();
                $('.m-delete-warning .m-content-message').text(`Bạn có thực sự muốn xóa Nhân viên <${empCode}> không?`);
            });
            // 2. Người dùng ẩn dropdown
            $('body').click(function () {
                $('.m-dropdown-emp').hide();
            });
            // 3. Người dùng chọn xóa nhân viên
            $('.m-item-delete').click(function () {
                $('.m-delete-warning').show();
            });

            /**
             * Các sự kiện trên các dialog
             * 1. Chọn đóng dialog cảnh báo thiếu thông tin
             */
            $(document).on('click', '.m-close-employee-danger', function () {
                $(this).parents('.m-dialog').hide();
                if ($('.m-input-error').length) {
                    $('.m-input-error')[0].focus();
                }
            });
            // 2. Các sự kiện trên dialog confirm xóa
            $('.m-delete-warning')
                // Người dùng chọn không
                .on('click', '.m-close-delete-warning', function () {
                    $(this).parents('.m-dialog').hide();
                })
                // Người dùng chọn có
                .on('click', '.m-confirm-delete', function () {
                    $('.m-loading-svg').show();
                    $(this).parents('.m-dialog').hide();
                    self.handleDeleteEmployee();
                });
            // 3. Các sự kiện trên dialog success
            $('.m-employee-success').on('click', '.m-close-success-dialog', function () {
                $(this).parents('.m-dialog').hide();
                if (self.formMode === EmpEnum.FormMode.EditAndAdd || self.formMode === EmpEnum.FormMode.SaveAndAdd) {
                    $('.m-button-add-emp').click();
                }
            });

            /**
             * Người dùng chọn sửa nhân viên
             */
            $(document).on('click', '.m-edit-employee', function () {
                self.formMode = EmpEnum.FormMode.Edit;
                // Lấy dữ liệu
                const empObject = $(this).parents('tr').data('object');
                // Lấy các input
                let inputs = $('[propName]');
                // Gán value cho các input
                for (let input of inputs) {
                    const propName = $(input).attr('propName');
                    const value = empObject[propName];
                    if ($(input).attr('type') == 'date' && value) {
                        $(input).val(value.split('T')[0]);
                    } else {
                        $(input).val(value);
                    }
                }
                // Gán value cho input Gender
                $('input[name="Gender"]').each(function () {
                    if (empObject.Gender) {
                        if ($(this).val() === empObject.Gender.toString()) {
                            $(this).prop('checked', true);
                        }
                    }
                });
                // Thêm data vào popup
                let formData = $('#employeeForm')
                    .serializeArray()
                    .reduce(function (obj, item) {
                        obj[item.name] = item.value;
                        return obj;
                    }, {});
                $('.m-add-popup').data('object', formData);
                $('.m-add-popup').data('empObject', empObject);
                $('.m-add-popup').show();
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Người dùng sửa thông tin nhân viên
     * Author: NVQUY(23/10/2022)
     */
    handleEditEmployee() {
        // 1. Gán con trỏ this
        self = this;
        // 2. Validation dữ liệu
        const valid = this.validationData();
        if (valid) {
            // 3. Xử lý dữ liệu
            let formData = $('#employeeForm')
                .serializeArray()
                .reduce(function (obj, item) {
                    obj[item.name] = item.value;
                    return obj;
                }, {});
            let employeeData = $('.m-add-popup').data('empObject');
            employeeData = { ...employeeData, ...formData };
            $('.m-loading-svg').show();
            // 4. Put dữ liệu
            $.ajax({
                type: 'PUT',
                url: `https://amis.manhnv.net/api/v1/Employees/${employeeData.EmployeeId}`,
                data: JSON.stringify(employeeData),
                dataType: 'json',
                contentType: 'application/json',
                success: function (response) {
                    debugger;
                    $('.m-loading-svg').hide();
                    $('.m-add-popup').hide();
                    $('.m-add-popup input:not([name="Gender"])').val('');
                    // Load lại data trên table
                    self.loadData();
                    // Hiển thị dialog sửa thành công
                    $('.m-employee-success .m-content-message').text('Sửa thông tin nhân viên thành công');
                    $('.m-employee-success').show();
                },
                error: function (response) {
                    debugger;
                    $('.m-loading-svg').hide();
                    // Show dialog nếu có lỗi
                    switch (response.status) {
                        case 400:
                            let dangerMessage = response.responseJSON.userMsg;
                            $('.m-employee-danger .m-content-message').html(dangerMessage);
                            $('.m-employee-danger').show();
                            break;
                        default:
                            break;
                    }
                },
            });
        }
    }

    /**
     * Người dùng xóa nhân viên
     * Author: NVQUY(23/10/2022
     */
    handleDeleteEmployee() {
        let empId = localStorage.getItem('empId');
        // Gán con trỏ this
        self = this;
        $.ajax({
            type: 'DELETE',
            url: `https://amis.manhnv.net/api/v1/Employees/${empId}`,
            success: function (response) {
                debugger;
                $('.m-loading-svg').hide();
                // Load lại dữ liệu
                self.loadData();
                // Hiển thị dialog xóa thành công
                $('.m-employee-success .m-content-message').text('Xóa nhân viên thành công');
                $('.m-employee-success').show();
            },
            error: function () {
                debugger;
                console.log(error);
            },
        });
    }

    /**
     * Người dùng thêm nhân viên mới
     * Author: NVQUY (23/10/2022)
     */
    handleAddEmployee() {
        try {
            // 1.Validate dữ liệu
            const valid = this.validationData();
            if (valid) {
                // 2.Xử lý dữ liệu
                let formData = $('#employeeForm')
                    .serializeArray()
                    .reduce(function (obj, item) {
                        obj[item.name] = item.value;
                        return obj;
                    }, {});
                let employeeData = {
                    EmployeeCode: null,
                    FirstName: null,
                    LastName: null,
                    EmployeeName: null,
                    Gender: 0,
                    DateOfBirth: null,
                    PhoneNumber: null,
                    Email: null,
                    Address: null,
                    IdentityNumber: null,
                    IdentityDate: null,
                    IdentityPlace: null,
                    JoinDate: null,
                    MartialStatus: null,
                    EducationalBackground: null,
                    QualificationId: null,
                    DepartmentId: null,
                    PositionId: null,
                    WorkStatus: null,
                    PersonalTaxCode: null,
                    Salary: null,
                    TelephoneNumber: null,
                    BankAccountNumber: null,
                    BankName: null,
                    BankBranchName: null,
                    BankProvinceName: null,
                    EmployeePosition: null,
                    PositionCode: null,
                    PositionName: null,
                    DepartmentCode: null,
                    DepartmentName: null,
                    QualificationName: null,
                    GenderName: null,
                    EducationalBackgroundName: null,
                    MartialStatusName: null,
                    CreatedDate: null,
                    CreatedBy: null,
                    ModifiedDate: null,
                    ModifiedBy: null,
                };
                employeeData = { ...employeeData, ...formData };
                // 3.Post dữ liệu
                $('.m-loading-svg').show();
                this.postEmployeeData(employeeData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Post dữ liệu nhân viên mới
     * Author: NVQUY (23/10/2022)
     */
    postEmployeeData(data) {
        try {
            self = this;
            $.ajax({
                type: 'POST',
                url: 'https://amis.manhnv.net/api/v1/Employees',
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json',
                success: function (response) {
                    debugger;
                    $('.m-loading-svg').hide();
                    $('.m-add-popup').hide();
                    $('.m-add-popup input:not([name="Gender"])').val('');
                    // Load lại dữ liệu trên table
                    self.loadData();
                    // Hiển thị dialog thêm thành công
                    $('.m-employee-success .m-content-message').text('Thêm nhân viên thành công');
                    $('.m-employee-success').show();
                },
                error: function (response) {
                    debugger;
                    // Hiển thị dialog nếu có lỗi xảy ra
                    $('.m-loading-svg').hide();
                    switch (response.status) {
                        case 400:
                            let dangerMessage = response.responseJSON.userMsg;
                            $('.m-employee-danger .m-content-message').html(dangerMessage);
                            $('.m-employee-danger').show();
                            break;
                        default:
                            break;
                    }
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Kiểm tra những trường bắt buộc nhập
     * Author: NQUY (22/10/2022)
     */
    validationData() {
        try {
            // 1. Kiểm tra các dữ liệu bắt buộc
            let firstElmError = null;
            $('.m-input-require').each(function () {
                if (!$(this).val()) {
                    $(this).addClass('m-input-error');
                    if (!firstElmError) firstElmError = $(this);
                }
            });

            if (firstElmError) {
                let dangerMessage = `${firstElmError.parent().find($('.m-input-title')).html()} không được bỏ trống.`;
                $('.m-employee-danger .m-content-message').html(dangerMessage);
                $('.m-employee-danger').show();
                return false;
            }

            // 2. Kiểm tra định dạng email
            // if ($('input[name="Email"]').val()) {
            //     if (!$('input[name="Email"]').val().includes('@')) {
            //         $('input[name="Email"]').addClass('m-input-error');
            //         $('.m-employee-danger .m-content-message').html('Email không đúng định dạng');
            //         $('.m-employee-danger').show();
            //         return false;
            //     }
            // }
            let email = document.querySelector('input[type="email"]');
            //  Lấy ra giá trị người dùng nhập từ bàn phím
             let value = email.value;
            //  Kiểm tra người dùng đã nhập dữ liệu hay chưa?
             if (!value) {
                 email.classList.add('m-input-error');
                 document.querySelector('.m-input-email-error').innerHTML = "&lt;Email&gt; không được để trống";
             } else {
                 let filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                 if (!filter.test(value)) {
                     document.querySelector('.m-input-email-error').innerHTML = "&lt;Email&gt; chưa đúng định dạng";
                     email.classList.add('m-input-error');
                 }
                 else {
                     email.classList.remove('m-input-error');
                     document.querySelector('.m-input-email-error').style.display = "none";
                 }
        
             }
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Load dữ liệu
     * Author: NVQUY(23/10/2022)
     */
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
                let employees = allEmployees.filter((emp) => {
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
                                //Định dạng ngày tháng
                                let dob = emp.DateOfBirth;
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
                                //Đẩy dữ liệu vào bảng
                                let trHTML = $(`<tr class="m-tr">
                                <td class="m-out-left-white-16"></td>
                                <td class="m-td m-td-multi" style="left: 16px">
                                    <label class="m-table-checkbox">
                                        <input type="checkbox" class="m-input-checkbox" />
                                        <span class="m-checkbox">
                                            <span class="m-checkbox-inner">
                                                <div
                                                    class="m-icon-16 m-icon-checkbox-active"
                                                ></div>
                                            </span>
                                        </span>
                                    </label>
                                </td>
                                <td class="m-td m-td-emp-code">${emp.EmployeeCode || ''}</td>
                                <td class="m-td">${emp.EmployeeName || ''}</td>
                                <td class="m-td">${emp.GenderName||  ''}</td>
                                <td class="m-td" style="text-align:center;">${dob ||''}</td>
                                <td class="m-td">${emp.EmployeePosition || ''}</td>
                                <td class="m-td">${emp.IdentityNumber || ''}</td>
                                <td class="m-td">${emp.DepartmentName || ''}</td>
                                <td class="m-td">${emp.BankAccountNumber || ''}</td>
                                <td class="m-td">${emp.BankName || ''}</td>
                                <td class="m-td">${emp.BankBranchName || ''}</td>
                                <td class="m-td">${emp.BankProvinceName || ''}</td>
                                <td class="m-td m-td-widget" style="right: 30px">
                                    <div class="m-dropdown">
                                        <button class="m-dropdown-type-feature m-dropdown-btn-text m-edit-employee">
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
                        handleEvent();
                    } catch (error) {
                        console.log(error);
                    }
                }
                //Tìm nhân viên theo tên, mã nhân viên
                $('.m-search-emp').on('keyup', function () {
                    employees = allEmployees.filter((emp) => {
                        return emp.EmployeeCode.toLowerCase().includes($('.m-search-emp').val().toLowerCase()) || emp.EmployeeName.toLowerCase().includes($('.m-search-emp').val().toLowerCase());
                    });
                    handleData(employees, parseInt($('.m-item-highlight').data('total')), 1);
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
                    let trHTML = $(`
                    <tr class="m-menu-items-tr">
                        <td class="m-menu-items-td" style="width: 100px; text-align: left"><span>${department.DepartmentCode || ''}</span></td>
                        <td class="m-menu-items-td" style="width: 250px; text-align: left"><span>${department.DepartmentName || ''}</span></td>
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

let EmpEnum = {
    FormMode: {
        Add: 1,
        Edit: 2,
        View: 3,
        SaveAndAdd: 4,
        EditAndAdd: 5,
    },
};
