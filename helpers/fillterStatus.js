module.exports = (query) => {
        let fillterStatus = [
        {
            name: "Tất cả",
            status :"all",
            class:"btn btn-success"

        },
        {
            name: "Đang hoạt động",
            status :"active",
            class:""

        },
        {
            name: "Dừng hoạt động",
            status :"inactive",
            class:""
        },
    ];
    if(query === 'active') {
        fillterStatus[1].class = "btn btn-success";
        fillterStatus[0].class = "";
    }else if(query === 'inactive'){
        fillterStatus[2].class = "btn btn-success";
        fillterStatus[0].class = "";
    }
    return fillterStatus;
}

