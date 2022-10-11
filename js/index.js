
// Gán css top để phần header trong body trượt khi scroll
$('.m-content-body').scroll(function () {
    $('.m-content-header').css({ top: -$(this).scrollTop() });
});
//  Gán chiều rộng cho phần phân trang
$('.m-pagination').css({ width: $('.m-table').width() });

// Gọi API lấy giữ liệu nhân viên
$.ajax({
    type: 'GET',
    url: 'https://amis.manhnv.net/api/v1/Employees',
    success: function (response) {
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

                        var trHTML = $(`<tr class="m-tr">
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
                                <td class="m-td m-td-widget" style="right: 30px">
                                    <div class="m-dropdown">
                                        <button class="m-dropdown-type-feature m-dropdown-btn-text m-edit-employee">
                                            <div class="m-btn-text"  ondblclick= 'showForm1()'>Sửa</div>
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
    },
    error: function () {
        debugger;
    },
});


