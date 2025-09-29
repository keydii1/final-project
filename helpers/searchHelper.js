module.exports = (req) => {
  if(req.query.keyword){
    const keyword = req.query.keyword;
    const regex = new RegExp(keyword, 'i'); // 'i' means case insensitive
    return {
      keyword: keyword,  // Trả về từ khóa gốc để hiển thị
      regex: regex       // Trả về regex để tìm kiếm
    };
  }
  return null;
}