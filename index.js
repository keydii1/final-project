const cookieParser = require('cookie-parser');
const session = require('express-session');
var flash = require('express-flash');

// import express into the Nodejs project
const express = require("express");
// express() is a function that create object aplication(web application)
// app variable is 
const app = express();


const route = require("./routes/client/index.route");
const  adminRoute = require("./routes/admin/index.route");
// Đây là lệnh import thư viện method-override trong Node.js.
var methodOverride = require('method-override')
var bodyParser = require('body-parser');
// to import the data in mongodb
const database = require("./config/database");
// is a package in NodeJS that will find filename that is .env and assigned them for process.env.(global variable in Nodejs )
// main purpose is protect data
require('dotenv').config();
database.connect();

const port = process.env.PORT;



// Body parser middleware

/*
Đây là middleware của Express để xử lý dữ liệu gửi từ form HTML (application/x-www-form-urlencoded).
Khi bạn gửi dữ liệu từ <form> bằng POST, Express sẽ tự động phân tích (parse) dữ liệu đó và gắn vào req.body.
*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('keyboard cat')); 

app.use(session({
  secret: 'keyboard cat',   // bắt buộc có secret
  resave: false,            // khuyên nên để false
  saveUninitialized: true,  // cho phép lưu session chưa khởi tạo
  cookie: { maxAge: 60000 } // 60s
}));
app.use(flash());

/*
 Đây là middleware để parse dữ liệu JSON từ request body.

Thường dùng khi client gửi API bằng fetch, axios, Postman với header Content-Type: application/json.
 */
app.use(express.json());



// tức là những file code trong thư mục public thì người dừng có thấy và truy cập được thông qua url
/**
Khi có app.use(express.static("public"))

Express tự động “mở cửa” folder public/ cho client truy cập trực tiếp qua URL.

Ví dụ:

http://localhost:3000/style.css   → lấy public/style.css
http://localhost:3000/logo.png    → lấy public/logo.png


Người dùng (trình duyệt) sẽ nhìn thấy nội dung file tĩnh (CSS, JS, ảnh, HTML tĩnh) mà bạn muốn công khai.

Khi không có express.static

Express không tự động cho người dùng truy cập file tĩnh.

Nếu bạn thử vào http://localhost:3000/style.css, server sẽ báo 404 Not Found.

Nhưng điều đó không có nghĩa là “người dùng không thấy code Node.js của bạn”.

Code Node.js (file .js trong backend) không bao giờ bị lộ ra client (dù có hay không có express.static).

Client chỉ thấy kết quả mà server gửi về (HTML, JSON, file tĩnh được cho phép).

 */
app.use(express.static("public"));
/**
🔹 1. app.set("views", "./views");

Nói cho Express biết thư mục chứa các file template (view).

Ở đây là thư mục ./views (ngay trong project).

 */
app.set("views", "./views");
/**
 * 2. app.set("view engine", "pug");

Cấu hình engine dùng để render view là Pug (một template engine cho Node.js).

Pug giúp viết HTML gọn hơn bằng cú pháp thụt đầu dòng.

Khi gọi res.render("home"), Express sẽ:

Tìm file views/home.pug.

Dùng engine pug để biên dịch thành HTML.

Gửi HTML về cho client.
 */
app.set("view engine", "pug");

// Method override middleware
/**
method-override là một middleware trong Express.

Nó cho phép bạn giả lập các HTTP method khác (PUT, PATCH, DELETE) thông qua query string hoặc body khi form HTML chỉ hỗ trợ GET và POST.
 */
app.use(methodOverride('_method'));


// App locals vairables
const systemConfig = require("./config/system");
/**
 * app.locals là một object đặc biệt trong Express.

Các biến gán vào đây sẽ có thể dùng ở bất kỳ đâu trong ứng dụng, đặc biệt là trong view engine (Pug, EJS, Handlebars, ...).

Nó giống như “biến toàn cục cho views”.

Ví dụ:

app.locals.prefixAdmin = "/admin";


Thì trong bất kỳ file .pug, bạn có thể dùng trực tiếp prefixAdmin.
 */
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Routes init
/**
 *Thực chất bạn đang truyền cái app này (Express application object) vào các module khác để họ có thể đăng ký route trực tiếp lên app.
 */
adminRoute(app);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



