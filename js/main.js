const dsnv = new DanhSachNhanVien();
const validation = new Validation();

function getELE(id) {
    return document.getElementById(id);
}

getLocalStorage();

function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
}

function getLocalStorage() {
    if (localStorage.getItem("DSNV") != null) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
        hienThiTable(dsnv.mangNV);
    }
}

function themNhanVien() {
    var taiKhoan = getELE("tknv").value;
    var hoTen = getELE("name").value;
    var email = getELE("email").value;
    var matKhau = getELE("password").value;
    var ngayLam = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;

    var isValid = true;

    // Kiểm tra Tài khoản
    isValid &= validation.kiemTraRong(taiKhoan, "tbTKNV", "Tài khoản không được để trống") && 
    validation.kiemTraTrung(taiKhoan, "tbTKNV", "Tài khoản không được trùng", dsnv.mangNV);

    // Kiểm tra tên
    isValid &= validation.kiemTraRong(hoTen, "tbTen", "Tên NV không được để trống") && 
    validation.kiemTraTen(hoTen, "tbTen", "Tên NV phải là chữ");

    // Kiểm tra email
    isValid &= validation.kiemTraEmail(email, "tbEmail", "Email không đúng định dạng");

    // Kiểm tra pass
    isValid &= validation.kiemTraPass(matKhau, "tbMatKhau", "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt và từ 6-10 ký tự");

    // Kiểm tra ngày làm
    isValid &= validation.kiemTraRong(ngayLam, "tbNgay", "Ngày làm không được để trống");

    // Kiểm tra lương cơ bản
    isValid &= validation.kiemTraRong(luongCB, "tbLuongCB", "Lương cơ bản không được để trống") &&
    validation.kiemTraLuongCB(luongCB, "tbLuongCB", "Lương cơ bản từ 1.000.000đ đến 20.000.000đ");

    // Kiểm tra chức vụ
    isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "Bạn chưa chọn chức vụ");

    // Kiểm tra giờ làm
    isValid &= validation.kiemTraRong(gioLam, "tbGiolam", "Giờ làm không được để trống") &&
    validation.kiemTraLuongCB(gioLam, "tbGiolam", "Giờ làm trong tháng từ 80 đến 200 giờ");

    if (isValid) {
        var nv = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam);
        nv.tinhTongLuong();
        nv.xepLoaiNV();
    
        dsnv.themNV(nv);
    
        setLocalStorage();
        getLocalStorage();
    }
}

function hienThiTable(mangNV) {
    var content = "";

    mangNV.map(function(nv, index) {
        var trELE = `<tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.loaiNV}</td>
            <td>
                <button onclick="xoaNhanVien('${nv.taiKhoan}')" class="btn btn-danger">Xóa</button>
                <button onclick="hienThiChiTiet('${nv.taiKhoan}')" class="btn btn-info" data-toggle="modal" data-target="#myModal">Xem</button>
            </td>
        </tr>`;

        content += trELE;
    })

    getELE("tableDanhSach").innerHTML = content;
}

function xoaNhanVien(id) {
    dsnv.xoaNV(id);
    setLocalStorage();
    getLocalStorage();
}

function hienThiChiTiet(id) {
    var viTri = dsnv.timViTri(id);
    if (viTri > -1) {
        getELE("tknv").value = dsnv.mangNV[viTri].taiKhoan;
        getELE("tknv").disabled = true;
        getELE("name").value = dsnv.mangNV[viTri].hoTen;
        getELE("email").value = dsnv.mangNV[viTri].email;
        getELE("password").value = dsnv.mangNV[viTri].matKhau;
        getELE("datepicker").value = dsnv.mangNV[viTri].ngayLam;
        getELE("luongCB").value = dsnv.mangNV[viTri].luongCB;
        getELE("chucvu").value = dsnv.mangNV[viTri].chucVu;
        getELE("gioLam").value = dsnv.mangNV[viTri].gioLam;
    }

    // getELE("btnThemNV").disabled = true;
}

function capNhatNhanVien() {
    var taiKhoan = getELE("tknv").value;
    var hoTen = getELE("name").value;
    var email = getELE("email").value;
    var matKhau = getELE("password").value;
    var ngayLam = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;

    var nv = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam);
    nv.tinhTongLuong();
    nv.xepLoaiNV();

    dsnv.capNhatNV(nv);

    setLocalStorage();
    getLocalStorage();
}

getELE("searchName").onkeyup = function() {
    var loaiTK = getELE("searchName").value;
    var mangTK = [];

    mangTK = dsnv.timKiemLoaiNV(loaiTK);
    hienThiTable(mangTK);
}

function resetForm() {
    getELE("formQLNV").reset();
    getELE("tknv").disabled = false;
}