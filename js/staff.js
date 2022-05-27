function Staff(account,fullName,email,password,dow,salary,position,hourWork)
{
    this.account = account
    this.fullName = fullName
    this.email = email
    this.password = password
    this.dow = dow
    this.salary = salary
    this.position = position
    this.hourWork = hourWork
}

Staff.prototype.totalSalary = function(){
    if(this.position === "Giám Đốc")
    {
        return this.salary * 3
    }
    if(this.position === "Trưởng phòng")
    {
        return this.salary * 2
    }
    if(this.position === "Nhân viên")
    {
        return this.salary 
    }
}

Staff.prototype.classification = function()
{
    if(this.hourWork < 160)
    {
        return "Trung Bình"
    }
    if(this.hourWork >=160 && this.hourWork < 176)
    {
        return "Khá"
    }  
      if(this.hourWork >=176 && this.hourWork < 192)
    {
        return "Giỏi"
    }
        if(this.hourWork >=192)
    {
        return "Xuất Sắc"
    }
}

