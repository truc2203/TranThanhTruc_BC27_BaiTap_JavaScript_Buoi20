var staffs = [];

init();

//localStorage
function init() {
  staffs = JSON.parse(localStorage.getItem("staffs")) || [];
  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    staffs[i] = new Staff(
      staff.account,
      staff.fullName,
      staff.email,
      staff.password,
      staff.dow,
      staff.salary,
      staff.position,
      staff.hourWork
    );
  }
  display(staffs);
}

//DOM lấy thông tin staff
function DOMStaff() {
  var account = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dow = document.getElementById("datepicker").value;
  var salary = document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var hourWork = document.getElementById("gioLam").value;

  var staff = new Staff(
    account,
    fullName,
    email,
    password,
    dow,
    salary,
    position,
    hourWork
  );

  return staff;
}

//Thêm staff
function addStaff() {
  var staff = DOMStaff();
  var isValid = validation();
  if (!isValid) {
    return;
  }
  staffs.push(staff);
  // Lưu localStorage
  localStorage.setItem("staffs", JSON.stringify(staffs));

  display(staffs);
  resetForm();
}

//Hiển thị
function display(staffs) {
  var show = document.getElementById("tableDanhSach");
  var html = "";
  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    html += `<tr>
                    <td>${staff.account}</td>
                    <td>${staff.fullName}</td>
                    <td>${staff.email}</td>                 
                    <td>${staff.dow}</td>
                    <td>${staff.position}</td>
                    <td>${staff.totalSalary()}</td>
                    <td>${staff.classification()}</td>
                    <td>
                        <button onclick="selectStaff('${
                          staff.account
                        }')" data-toggle="modal" data-target="#myModal" class="btn btn-success">Sửa</button> </td>
                        <td>
                        <button onclick="deleteStaff('${
                          staff.account
                        }')" class="btn btn-danger">Xoá</button> </td>
                </tr>
        `;
  }
  show.innerHTML = html;
}

//Reset form
function resetForm() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
  document.getElementById("btnThemNV").disabled = false;
  document.getElementById("tknv").disabled = false;
  document.getElementById("tbTKNV").innerHTML = ""
  document.getElementById("tbTen").innerHTML = ""
  document.getElementById("tbEmail").innerHTML = ""
  document.getElementById("tbMatKhau").innerHTML = ""
  document.getElementById("tbNgay").innerHTML = ""
  document.getElementById("tbLuongCB").innerHTML = ""
  document.getElementById("tbChucVu").innerHTML = ""
  document.getElementById("tbGiolam").innerHTML = ""
}

//Xoá staff
function deleteStaff(account) {
  var index = findAccount(account);
  if (index !== -1) {
    staffs.splice(index, 1);
    localStorage.setItem("staffs", JSON.stringify(staffs));
    display(staffs);
  }
}

//Chọn staff
function selectStaff(account) {
  var index = findAccount(account);
  var staff = staffs[index];
  document.getElementById("tknv").value = staff.account;
  document.getElementById("name").value = staff.fullName;
  document.getElementById("email").value = staff.email;
  document.getElementById("password").value = staff.password;
  document.getElementById("datepicker").value = staff.dow;
  document.getElementById("luongCB").value = staff.salary;
  document.getElementById("chucvu").value = staff.position;
  document.getElementById("gioLam").value = staff.hourWork;
  document.getElementById("btnThemNV").disabled = true;
  document.getElementById("tknv").disabled = true;
}

//Sửa thông tin staff
function updateStaff() {
  var staff = DOMStaff();
  var isValid = validation();
  if (!isValid) {
    return;
  }
  var index = findAccount(staff.account);
  staffs[index] = staff;
  localStorage.setItem("staffs", JSON.stringify(staffs));
  display(staffs);
}

//Tìm staff
function searchStaff() {
  var search = document.getElementById("searchName").value;
  var newStaffs = [];
  var search = search.toLowerCase();
  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    var type = staff.classification();
    var nameOfStaff = type.toLowerCase();
    if (nameOfStaff.indexOf(search) !== -1) {
      newStaffs.push(staff);
    }
  }
  display(newStaffs);
}

function findAccount(account) {
  var index = -1;
  for (var i = 0; i < staffs.length; i++) {
    if (staffs[i].account === account) {
      index = i;
      break;
    }
  }
  return index;
}
function validation() {
  var staff = DOMStaff();
  var isValid = true;
  if (!isRequired(staff.account)) {
    isValid = false
    document.getElementById("tbTKNV").innerHTML = "Tài khoản không được để trống";
  }
  if (!isRequired(staff.fullName)) {
    isValid = false
    document.getElementById("tbTen").innerHTML = "Tên không được để trống";
  }
  if (!isRequired(staff.email)) {
    isValid = false
    document.getElementById("tbEmail").innerHTML = "Email không được để trống";
  }
  if (!isRequired(staff.password)) {
    isValid = false
    document.getElementById("tbMatKhau").innerHTML = "Mật khẩu không được để trống";
  }
  if (!isRequired(staff.dow)) {
    isValid = false
    document.getElementById("tbNgay").innerHTML = "Vui lòng chọn ngày làm";
  }
  if (!isRequired(staff.salary)) {
    isValid = false
    document.getElementById("tbLuongCB").innerHTML = "Lương không được để trống";
  }
  if (!isRequired(staff.position)) {
    isValid = false
    document.getElementById("tbChucVu").innerHTML = "Vui lòng chọn chức vụ";
  }
  if (!isRequired(staff.hourWork)) {
    isValid = false
    document.getElementById("tbGiolam").innerHTML = "Giờ làm không được để trống";
  }
  return isValid
}

function isRequired(value) {
  if (!value) {
    return false;
  }
  return true;
}
