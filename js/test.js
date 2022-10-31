//Khởi tạo đối tượng Employee
$(document).ready(function () {
    new Employee();
});
//Tạo class Employee 
class Employee {
    // Cờ check mode khi gửi dữ liệu. VD: thêm, sửa,...
    formMode = EmpEnum.FormMode.Add;
    constructor() {
        this.initEvents();
        this.loadData();
    }

    initEvents() {
        try {
            // Gán con trỏ this
            let employee = this;
            //Mở form popup
            employee.showFormEmployee();

            //Đóng form popup
            employee.closeFormEmployee();

            //Xử lý các sự kiện trên bảng
            employee.handleTable();

            //Xử lý các sự kiện checkbox
            employee.handleCheckbox();

            //Tabindex form popup
            $('.m-button-close').keydown(function (event) {
                $(this).parents('.m-dialog').find('[tabindex="1"]').focus();
                event.preventDefault();
            });

            //Sự kiện liên quan đến dropdown
            employee.handleDropdown();

            //Sửa nhân viên
            employee.handleEditEmployee();

            //Xóa nhân viên
            employee.handleDeleteEmployee();

            //Các sự kiện liên quan đén dialog
            employee.handleDialog();

            //Người dùng chọn sửa nhân viên
            $(document).on('click', '.m-edit-employee', function () {
                $('.m-title-content').text('Sửa nhân viên');
                // employee.formMode = EmpEnum.FormMode.Edit;
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

    handleDialog() {
        let employee = this;
        //Người dùng chọn cất
        $(document).on('click', '.m-popup-store-btn', function () {
            if (employee.formMode === EmpEnum.FormMode.Add) {
                // Nếu mode là thêm nhân viên
                employee.handleAddEmployee();
            } else if (employee.formMode === EmpEnum.FormMode.Edit) {
                // Nếu mode là sửa thông tin nhân viên
                employee.handleEditEmployee();
            }
        });
        //Sự kiện trên dialog confirm đóng popup thêm nhân viên
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
        //Người dùng chọn cất và thêm
        $(document).on('click', '.m-popup-store-and-add-btn', function () {
            if (employee.formMode === EmpEnum.FormMode.Add) {
                // Nếu mode là thêm nhân viên
                employee.handleAddEmployee();
            } else if (employee.formMode === EmpEnum.FormMode.Edit) {
                // Nếu mode là sửa thông tin nhân viên
                employee.handleEditEmployee();
            }
        });

        //Chọn đóng dialog cảnh báo thiếu thông tin
        $(document).on('click', '.m-close-employee-danger', function () {
            $(this).parents('.m-dialog').hide();
            if ($('.m-input-error').length) {
                $('.m-input-error')[0].focus();
            }
        });
        //Các sự kiện trên dialog confirm xóa
        $('.m-delete-warning')
            // Người dùng chọn không
            .on('click', '.m-close-delete-warning', function () {
                $(this).parents('.m-dialog').hide();
            })
            // Người dùng chọn có
            .on('click', '.m-confirm-delete', function () {
                $('.m-loading-svg').show();
                $(this).parents('.m-dialog').hide();
                employee.handleDeleteEmployee();
            });
        // 3. Các sự kiện trên dialog success
        $('.m-employee-success').on('click', '.m-close-success-dialog', function () {
            $(this).parents('.m-dialog').hide();
            if (employee.formMode === EmpEnum.FormMode.EditAndAdd || employee.formMode === EmpEnum.FormMode.SaveAndAdd) {
                $('.m-button-add-emp').click();
            }
        });
    }
    /**
     * Xử lý các sự kiện liên quan đến checkbox
     * Author: NVQUY(27/10/2022)
     */
    handleCheckbox() {
        try {
            //Gắn con trỏ this
            let employee = this;

            //Người dùng tích check all
            $('.m-input-checkall').click(function () {
                $('.m-input-checkbox').prop('checked', $(this).prop('checked'));
                $('.m-input-checkbox').parents('tr').addClass('checked');
                $('#m-input-delete').prop('disabled', !$(this).prop('checked'));
            });
            //Người dúng tích 1 dòng
            $(document).on('change', '.m-input-checkbox', function () {
                // Làm nổi bật dòng đang tích
                let trElement = $(this).parents('tr');
                if ($(this).prop('checked')) {
                    trElement.addClass('checked');
                    $('#m-input-delete').prop('disabled', !$(this).prop('checked'));
                } else {
                    trElement.removeClass('checked');
                    $('#m-input-delete').prop('disabled', true);
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
            //Làm nổi bật dòng người người dùng click trên bảng
            $(document).on('click', '.m-tr', function () {
                const focusElement = $(this);
                $('.m-tr').each(function () {
                    if ($(this) !== focusElement && !$(this).find('.m-input-checkbox').prop('checked')) {
                        $(this).removeClass('checked');
                    }
                });
                focusElement.addClass('checked');
            });
        } catch (error) {
            console.log(error);
        }
    }
    /**
    * Xử lý sự kiện liên quan đến dropdown
    * Author: NVQUY(27/10/2022)
    */
    handleDropdown() {
        let employee = this;
        /**
         * 1. Mở và đóng dropdown chọn số bản ghi
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
        // 2. Mở và đóng dropdown chọn phòng ban
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

        
        //Các sự kiện trên dropdown: Nhân bản, Xóa, Ngừng sử dụng
         //Người dúng mở dropdown
            
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
        //Người dùng ẩn dropdown
        $('body').click(function () {
            $('.m-dropdown-emp').hide();
        });
        //Người dùng chọn xóa nhân viên
        $('.m-item-delete').click(function () {
            $('.m-delete-warning').show();
        });

    }
    /**
     * Xử lý các sự kiện liên quan đến bảng
     * Author: NVQUY(25/10/2022)
     */
    handleTable() {
        // gắn con trỏ 
        let employee = this;
        //double click cho hàng của bảng danh sách nhân viên
        $(document).on('dblclick', 'tbody tr td:not(:first-child,:last-child)', function () {
            employee.handleEditEmployee();
        });
    }

    /**
     * So sánh 2 object
     * Author:NVQUY(26/10/2022)
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
    /**
     * Người dùng sửa thông tin nhân viên
     * Author: NVQUY(26/10/2022)
     */
    handleEditEmployee() {
        // 1. Gán con trỏ this
        let employee = this;
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

                    $('.m-loading-svg').hide();
                    $('.m-add-popup').hide();
                    $('.m-add-popup input:not([name="Gender"])').val('');
                    // Load lại data trên table
                    employee.loadData();
                },
                error: function (response) {
                    console.log(response.status);
                    $('.m-loading-svg').hide();
                },
            });
        }
    }
    /**
     * Người dùng xóa nhân viên
     * Author: NVQUY (26/10/2022
     */
    handleDeleteEmployee() {
        let empId = localStorage.getItem('empId');
        // Gán con trỏ this
        let employee = this;
        $.ajax({
            type: 'DELETE',
            url: `https://amis.manhnv.net/api/v1/Employees/${empId}`,
            success: function (response) {
                $('.m-loading-svg').hide();
                // Load lại dữ liệu
                employee.loadData();
            },
            error: function (response) {
                console.log(response);
            },
        });
    }

    /**
     * Người dùng thêm nhân viên mới
     * Author: NVQUY(25/10/2022)
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
     * Author: NVQUY(26/10/2022)
     */
    postEmployeeData(data) {
        try {
            let employee = this;
            $.ajax({
                type: 'POST',
                url: 'https://amis.manhnv.net/api/v1/Employees',
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json',
                success: function (response) {
                    $('.m-loading-svg').hide();
                    $('.m-add-popup').hide();
                    $('.m-add-popup input:not([name="Gender"])').val('');
                    // Load lại dữ liệu trên table
                    employee.loadData();
                },
                error: function (response) {
                    // Hiển thị dialog nếu có lỗi xảy ra
                    $('.m-loading-svg').hide();
                    switch (response.status) {
                        case 400:
                            let dangerMessage = response.responseJSON.userMsg;
                            $('.m-employee-danger .m-content-message').html(dangerMessage);
                            $('.m-employee-danger').show();
                            break;
                        case 500:
                            let dangerMessageServer = response.responseJSON.userMsg;
                            $('.m-employee-danger .m-content-message').html(dangerMessageServer);
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
     * Author: NVQUY(27/10/2022)
     */
    validationData() {
        try {
            let firstElmError = null;
            //Hiển thị border màu đỏ cảnh báo người dùng không nhập không hợp lệ
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
            //Kiểm tra các dữ liệu bắt buộc
            $('.m-input-require').each(function () {
                if (!$(this).val()) {
                    $(this).addClass('m-input-error');

                } else {
                    $(this).removeClass('m-input-error');

                }
            });

            // 2. Kiểm tra định dạng email
            if ($('input[name="Email"]').val()) {
                if (!$('input[name="Email"]').val().includes('@')) {
                    $('input[name="Email"]').addClass('m-input-error');
                    $('.m-employee-danger .m-content-message').html('Email không đúng định dạng');
                    $('.m-employee-danger').show();
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Sự kiện mở form thêm mới nhân viên
     * Author: NVQUY (28/10/2022)
     */
    showFormEmployee() {
        try {
            //click vào nút thêm mới nhân viên sẽ hiển thị form
            $(document).on('click', '.m-button-add-emp', function () {
                //gắn con trỏ
                let employee = this;
                $('.m-loading-svg').show();
                // employee.formMode = EmpEnum.FormMode.Add;

                $.ajax({
                    type: 'GET',
                    url: 'https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode',
                    success: function (response) {
                        $('input[name="Gender"][value="0"]').prop('checked', true);
                        $('.m-loading-svg').hide();
                        $('input[name="EmployeeCode"]').val(response);
                        $('.m-add-popup').show();
                        $('.m-title-content').text("Thêm mới nhân viên");
                        $('input[name="EmployeeCode"]').focus();
                        // 
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
                        $('.m-loading-svg').hide();
                        console.log(response);
                    },
                });
            });
        } catch (error) {
            console.log(error);
        }

    }


    /**
     * Sự kiện đóng form popup
     * Author : NVQUy(28/10/2022)
     */
    closeFormEmployee() {
        // Gắn con trỏ this
        let employee = this;
        $(document).on('click', '.m-button-add-emp', function () {
            employee.formMode = EmpEnum.FormMode.Add;
            $.ajax({
                type: 'GET',
                url: 'https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode',
                success: function (response) {
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
            let dataChange = employee.objectEqual(formData, $('.m-add-popup').data('object'));
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


    }

    /**
     * Load dữ liệu
     * Author: NVQUY(25/10/2022)
     */
    loadData() {
        try {
            if ($('.m-loading-svg').is(':hidden')) {
                $('m-loading-svg').show();
            }
            let employee = this;
            // Gọi API lấy giữ liệu nhân viên
            $.ajax({
                type: 'GET',
                url: 'https://amis.manhnv.net/api/v1/Employees',
                success: function (response) {
                    // 
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
                            // Phân trang
                            let totalPage = Math.ceil(employees.length / perPage);
                            let pageHtml = '';
                            if (totalPage <= 5) {
                                for (let i = 1; i <= totalPage; i++) {
                                    pageHtml += `<div class="m-number ${i == page ? 'm-selected' : ''}">${i}</div>`;
                                }
                            } else if (totalPage - page + 1 <= 5) {
                                for (let i = totalPage - 4; i <= totalPage; i++) {
                                    pageHtml += `<div class="m-number ${i == page ? 'm-selected' : ''}">${i}</div>`;
                                }
                            } else {
                                pageHtml += `<div class="m-number m-selected">${page}</div>`;
                                for (let i = page + 1; i <= page + 3; i++) {
                                    pageHtml += `<div class="m-number">${i}</div>`;
                                }
                                pageHtml += `<div>...</div><div class="m-number">${totalPage}</div>`;
                            }
                            $('.m-page-index').empty();
                            $('.m-page-index').append(pageHtml);
                            $('.m-prev-page').removeClass('m-disable');
                            $('.m-next-page').removeClass('m-disable');

                            if (page == 1) {
                                $('.m-prev-page').addClass('m-disable');
                            }

                            if (page == totalPage) {
                                $('.m-next-page').addClass('m-disable');
                            }
                            // Làm trống table
                            $('.m-tbody').empty();
                            // Render danh sách nhân viên
                            for (let i = (page - 1) * perPage; i < (page - 1) * perPage + perPage; i++) {
                                const emp = employees[i];
                                if (emp) {
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

                                    let trHTML = $(`<tr class="m-tr">
                                <td class="m-td m-td-multi">
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
                                <td class="m-td">${emp.GenderName || ''}</td>
                                <td class="m-td" style="text-align:center">${dob || ''}</td>
                                <td class="m-td">${emp.EmployeePosition || ''}</td>
                                <td class="m-td">${emp.IdentityNumber || ''}</td>
                                <td class="m-td">${emp.DepartmentName || ''}</td>
                                <td class="m-td">${emp.BankAccountNumber || ''}</td>
                                <td class="m-td">${emp.BankName || ''}</td>
                                <td class="m-td">${emp.BankBranchName || ''}</td>
                                <td class="m-td">${emp.BankProvinceName || ''}</td>
                                <td class="m-td m-td-widget">
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

                    /**********************************************
                    * Các sự kiện sau khi đổ dữ liệu ra table
                    */
                    function handleEvent() {
                        try {
                            // Lấy độ dài của bản ghi
                            $('.m-total-record .m-total').html(employees.length);
                            $('.m-pagination').css({ display: 'flex' });

                            //Nếu checkall được tích thì check tất cả các checkbox hiển thị
                            if ($('.m-input-checkall').prop('checked')) {
                                $('.m-input-checkbox').prop('checked', false);
                                $('.m-input-checkall').prop('checked', false);
                                $('#m-input-delete').prop('disabled', !$(this).prop('checked'));
                                $('.m-input-checkbox').parents('tr').removeClass('checked');
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    /**********************************************
                     * Các sự kiện cần đổ lại dữ liệu ra bảng
                     * 1. Chọn các trang theo số thứ tự
                     */
                    $(document).on('click', '.m-page-index  .m-number', function () {
                        handleData(employees, parseInt($('.m-item-highlight').data('total')), parseInt($(this).html()));
                    });
                    // 2. Chọn trang trước
                    $('.m-prev-page').click(function () {
                        if (!$(this).hasClass('m-disable')) {
                            handleData(employees, parseInt($('.m-item-highlight').data('total')), parseInt($('.m-selected').html()) - 1);
                        }
                    });
                    // 3. Chọn trang sau
                    $('.m-next-page').click(function () {
                        if (!$(this).hasClass('m-disable')) {
                            handleData(employees, parseInt($('.m-item-highlight').data('total')), parseInt($('.m-selected').html()) + 1);
                        }
                    });
                    // 4. Chọn tổng số bản ghi trên 1 trang
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
                    // 5. Tìm nhân viên theo tên, mã nhân viên
                    $('.m-search-emp').on('keyup', function () {
                        employees = allEmployees.filter((emp) => {
                            return emp.EmployeeCode.toLowerCase().includes($('.m-search-emp').val().toLowerCase()) || emp.EmployeeName.toLowerCase().includes($('.m-search-emp').val().toLowerCase());
                        });
                        handleData(employees, parseInt($('.m-item-highlight').data('total')), 1);
                    });
                },
                error: function (response) {
                    $('.m-loading-svg').hide();
                    console.log(response);
                },
            });
            // Gọi API lấy dữ liệu phòng ban
            $.ajax({
                type: 'GET',
                url: 'https://amis.manhnv.net/api/v1/Departments',
                success: function (response) {
                    const departments = response;
                    $('.m-departments-list').empty();
                    for (const department of departments) {
                        let trHTML = $(`
                    <tr class="m-menu-items-tr">
                        <td class="m-menu-items-td" style="width: 100px; text-align: left"><span>${department.DepartmentCode ? department.DepartmentCode : ''}</span></td>
                        <td class="m-menu-items-td" style="width: 250px; text-align: left"><span>${department.DepartmentName}</span></td>
                    </tr>
                    `);
                        $(trHTML).data('object', department);
                        $('.m-departments-list').append(trHTML);
                    }
                },
                error: function (response) {
                    console.log(response);
                },
            });
        } catch (error) {
            console.log(error);
        }
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
