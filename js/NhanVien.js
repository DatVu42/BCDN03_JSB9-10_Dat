function NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam) {
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = 0;
    this.loaiNV = "";

    this.tinhTongLuong = function() {
        if (this.chucVu === "Giám đốc") {
            this.tongLuong = this.luongCB * 3;
        } else if (this.chucVu === "Trưởng phòng") {
            this.tongLuong = this.luongCB * 2;
        } else {
            this.tongLuong = this.luongCB;
        }
    }

    this.xepLoaiNV = function() {
        if (this.gioLam >= 192) {
            this.loaiNV = "Xuất sắc";
        } else if (this.gioLam >= 176 && this.gioLam < 192) {
            this.loaiNV = "Giỏi";
        } else if (this.gioLam >= 160 && this.gioLam < 176) {
            this.loaiNV = "Khá";
        } else {
            this.loaiNV = "Trung bình";
        }
    }
}