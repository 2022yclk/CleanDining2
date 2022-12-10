const http = require("http");
const express = require("express");
const path = require("path");

const app = express();

const port = 3000; //인스턴스 생성시 만들었던 포트번호 기입

//
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.post("/addParty", (req,res)=> {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "serverDBManager",
        password: "0000",
        database: "dining",
        port: 3306
    });

    connection.connect();
   const license = req.body.license;
   const title = req.body.title;
    const partydate = req.body.date;
   const partyHour = req.body.hour;
   const partyMin = req.body.min
   const brief = req.body.briefInfo;
    const number = req.body.gather_num;
   const content = req.body.content;
   const due = req.body.duedate;
   const resName = req.body.resName;
   const email = req.body.userEmail;
    
   //ADDED By Koh
   connection.query("SELECT id FROM users WHERE email = ?", [email], function(err, rows){
      if(err) throw err;
      else if(rows.length){
         const userid = rows[0].id;
		 console.log(partydate);
         connection.query("INSERT INTO findPeople(writer_id, license_id, title, date, hour, min, briefInfo, gather_num, content, dueDate, resName) values (?,?,?,?,?,?,?,?,?,?,?)", 
         [userid, license, title, partydate, partyHour, partyMin, brief, number, content, due, resName], function(err,rows){
              if(err) throw err;
              else{
                  console.log("insert at findPeople");
              }
          });
         connection.query("SELECT post_id FROM findPeople WHERE writer_id = ? AND date = ? AND hour = ? AND min = ? AND license_id = ?", [userid, partydate, partyHour, partyMin, license],function(err, rows){
			if(err) throw err;
            else {
               const postid = rows[0].post_id;
               connection.query("INSERT INTO user_party(email, post_id) values (?,?)", [email, postid], function(err, rows){
                  if(err) throw err;
                  else {
                     console.log("insert at user_party");
                  }
               })
            }
         })
         //connection.end();
      }
      else {
         res.send("ERROR: NO SUCH EMAIL IN DB");
         connection.end();
      }
   });
});

app.post("/addReview", (req,res)=> {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "serverDBManager",
        password: "0000",
        database: "dining",
        port: 3306
    });

    connection.connect();
	const license = req.body.license;
	const title = req.body.title;
    const visitdate = req.body.visitDate;
    const grade = req.body.grade;
	const content = req.body.content;
	const email = req.body.userEmail;
	const resName = req.body.resName;

	//Added By Koh
	connection.query("SELECT id FROM users WHERE email = ?", [email], function(err, rows){
		if(err) throw err;
		else if(rows.length){
			const userid = rows[0].id;
    //console.log(partydate, number, license);
			connection.query("INSERT INTO review(writer_id, license_id, title, date, grade, content, resName) values (?,?,?,?,?,?,?)", 
			[userid, license, title, visitdate, grade, content, resName], function(err,rows){
        if(err) throw err;
        else{
            console.log("insert");
            //res.send("success");
        }
    });
		}
		else {
			res.send("ERROR: NO SUCH EMAIL IN DB");
			connection.end();
		}
	});
})

app.post("/addAlert", (req, res) => {
	var connection = mysql.createConnection({
		host: "localhost",
		user: "serverDBManager",
		password: "0000",
		databse: "dining",
		port: 3306
	});
	connection.connect();
	const review_id = req.body.review_id;

	connection.query("UPDATE dining.review SET alertCnt = alertCnt + 1 WHERE review_id = ?", [review_id], function(err,rows){
		if(err) throw err;
		else{
			console.log("alert success");
		}
	});
})

app.post("/addRecommend", (req, res) => {
	var connection = mysql.createConnection({
		host: "localhost",
		user: "serverDBManager",
		password: "0000",
		databse: "dining",
		port: 3306
	});
	connection.connect();
	const review_id = req.body.review_id;

	connection.query("UPDATE dining.review SET recomCnt = recomCnt + 1 WHERE review_id = ?", [review_id], function(err,rows){
		if(err) throw err;
		else{
			console.log("recommend success");
		}
	});
})

app.post("/participateParty", (req, res) => {
	var connection = mysql.createConnection({
	   host: "localhost",
	   user: "serverDBManager",
	   password: "0000",
	   database: "dining",
	   port: 3306
	});
	connection.connect();
	const postid = req.body.postid;
	const email = req.body.email;
	connection.query("SELECT * FROM user_party WHERE email = ? AND post_id = ?", [email, postid], function(err, rows){
	   if (err) throw err
	   else if(rows.length){
		  res.send("Already");
	   }
	   else {
		  connection.query("UPDATE dining.findPeople SET gathered = gathered + 1 WHERE post_id = ?", [postid], function(err,rows){
			 if(err) throw err;
			 else{
				console.log("participate success");               
			 }
		   });
 
		  connection.query("INSERT INTO user_party(email, post_id) values (?,?)",[email, postid],function(err, rows){
			 if(err) throw err;
			 else {
				console.log("Insert at user_party");
				res.send("Participated");
			 }
		   })
	   }
	  })
  })
 

app.get("/getPartyData", (req,res)=>{
	var connection = mysql.createConnection({
		host : "localhost",
		user : "serverDBManager", //mysql의 id
		password : "0000", //mysql의 password
		database : "dining", //사용할 데이터베이스
		port : 3306
	});
	connection.connect();
	const value = req.query.key;
	console.log(value);
	connection.query("SELECT * FROM findPeople WHERE license_id = ?", [value], function(err,data){
		if(err) throw err;
		else{
			console.log("get");
			res.send(data);
		}
	});
})

app.get("/getPartyDataDetail", (req,res)=>{
	var connection = mysql.createConnection({
		host : "localhost",
		user : "serverDBManager", //mysql의 id
		password : "0000", //mysql의 password
		database : "dining", //사용할 데이터베이스
		port : 3306
	});
	connection.connect();
	const value = req.query.key;
	console.log(value);
	connection.query("SELECT * FROM findPeople WHERE post_id = ?", [value], function(err,data){
		if(err) throw err;
		else{
			console.log("get");
			res.send(data);
		}
	});
})

app.get("/getReviewData", (req,res)=>{
	var connection = mysql.createConnection({
		host : "localhost",
		user : "serverDBManager", //mysql의 id
		password : "0000", //mysql의 password
		database : "dining", //사용할 데이터베이스
		port : 3306
	});
	connection.connect();
	const value = req.query.key;
	console.log(value);
	connection.query("SELECT * FROM review WHERE license_id = ?", [value], function(err,data){
		if(err) throw err;
		else{
			console.log("get");
			res.send(data);
		}
	});
})

app.get("/getReviewDataDetail", (req,res)=>{
	var connection = mysql.createConnection({
		host : "localhost",
		user : "serverDBManager", //mysql의 id
		password : "0000", //mysql의 password
		database : "dining", //사용할 데이터베이스
		port : 3306
	});
	connection.connect();
	const value = req.query.key;
	console.log(value);
	connection.query("SELECT * FROM review WHERE review_id = ?", [value], function(err,data){
		if(err) throw err;
		else{
			console.log("get");
			res.send(data);
		}
	});
})

app.post("/addMember", (req,res)=> {
	console.log("Start Add Memeber");
	var connection = mysql.createConnection({
		    host : "localhost",
		    user : "serverDBManager", //mysql의 id
		    password : "0000", //mysql의 password
		    database : "dining", //사용할 데이터베이스
		    port : 3306
	});
	connection.connect();
	const email = req.body.email;
	const name = req.body.name;
	const password = req.body.password;
	connection.query("SELECT * FROM users WHERE email = ?", [email], function(err, rows){
		if(err) throw err;
		else if(rows.length){
			res.send("Already");
		}
		else {
			connection.query("INSERT INTO users(email, name, password) values (?,?,?)", [email, name, password], function (err, rows){
				if(err) throw err;
				else {
					console.log("1 record inserted");
					res.send("Success");
				}
			});
		}
		connection.end();
	});    
})
//
app.post("/loginVerify", (req, res) =>{
	    console.log("Start Login Verify");
	    var connection = mysql.createConnection({
		            host : "localhost",
		            user : "serverDBManager", //mysql의 id
		            password : "0000", //mysql의 password
		            database : "dining", //사용할 데이터베이스
		            port : 3306
		        });
	    connection.connect();
	    const email = req.body.email;
	    const password = req.body.password;
	    console.log("email:");
	    console.log(email);
	    console.log("password");
	    console.log(password);
            connection.query("SELECT email, password FROM users WHERE email = ?", [email], function(err, rows){
		    if(err) throw err;
		    else if(rows.length){
			    console.log("Get Rows");
			    if(rows[0].password == password){
				    res.send("SUCCESS");
			    }
			    else {                
			            res.send("ERROR1");
			    }
		    }
		    else{
			    res.send("ERROR2");
		    }
		    connection.end();
	     })
});

app.post("/adminloginVerify", (req, res) =>{
    console.log("Start Admin Login Verify");
    var connection = mysql.createConnection({
                host : "localhost",
                user : "serverDBManager", //mysql의 id
                password : "0000", //mysql의 password
                database : "dining", //사용할 데이터베이스
                port : 3306
            });
    connection.connect();
    const adminID = req.body.adminID;
    const password = req.body.password;
    console.log("adminID:");
    console.log(adminID);
    console.log("password");
    console.log(password);
        connection.query("SELECT admin_id, password FROM admin WHERE admin_id = ?", [adminID], function(err, rows){
        if(err) throw err;
        else if(rows.length){
            console.log("Get Rows");
            if(rows[0].password == password){
                res.send("SUCCESS");
            }
            else {                
                    res.send("ERROR1");
            }
        }
        else{
            res.send("ERROR2");
        }
        connection.end();
     })
});

// =============================================
// ADMIN
// =============================================
app.get("/getReportedData", (req,res)=>{
	var connection = mysql.createConnection({
		host : "localhost",
		user : "serverDBManager", //mysql의 id
		password : "0000", //mysql의 password
		database : "dining", //사용할 데이터베이스
		port : 3306
	});
	connection.connect();
	//const value = req.query.key;
	//console.log("in server.js > value is::");
	//console.log(value);
	connection.query("SELECT * FROM review WHERE alertCnt > 1", function(err,data){
		if(err) throw err;
		else{
			console.log("get");
			res.send(data);
		}
	});
})

app.delete("/adminDeleteOriginReview", (req,res)=>{
	var connection = mysql.createConnection({
		host : "localhost",
		user : "serverDBManager", //mysql의 id
		password : "0000", //mysql의 password
		database : "dining", //사용할 데이터베이스
		port : 3306
	});
	connection.connect();
	const value = req.query.key;
	console.log(value);
	connection.query("DELETE FROM review WHERE review_id = ?", [value], function(err,data){
		if(err) throw err;
		else{
			console.log("delete");
			res.send(data);
		}
	});
})

app.post("/adminInitAlertCnt", (req,res)=>{
	var connection = mysql.createConnection({
		host : "localhost",
		user : "serverDBManager", //mysql의 id
		password : "0000", //mysql의 password
		database : "dining", //사용할 데이터베이스
		port : 3306
	});
	connection.connect();
	const value = req.query.key;
	console.log(value);
	connection.query("UPDATE review SET alertCnt=0 WHERE review_id = ?", [value], function(err,data){
		if(err) throw err;
		else{
			console.log("delete");
			res.send(data);
		}
	});
})
// =============================================
// 마이페이지
//회원 탈퇴
app.post("/deleteUser", (req,res)=>{
	var connection = mysql.createConnection({
		host : "localhost",
		user : "serverDBManager", //mysql의 id
		password : "0000", //mysql의 password
		database : "dining", //사용할 데이터베이스
		port : 3306
	});
	connection.connect();
	const email = req.body.email;
	connection.query("DELETE FROM users WHERE email = ?", [email], function(err,data){
		if(err) throw err;
		else{
			console.log("delete User");
			res.send("Delete User");
		}
	});
})

//내가 쓴 리뷰 확인
app.get("/getMyReview", (req,res)=>{
	var connection = mysql.createConnection({
		host : "localhost",
		user : "serverDBManager", //mysql의 id
		password : "0000", //mysql의 password
		database : "dining", //사용할 데이터베이스
		port : 3306
	});
	connection.connect();
	const email = req.query.email;
	connection.query("SELECT * FROM users u, review r WHERE u.email = ? AND u.id = r.writer_id", [email], function(err,data){
		if(err) throw err;
		else{
			console.log("Get my Review");
			res.send(data);
		}
	});
})

// 내가 참여한 파티 확인하기
app.get("/getMyParty", (req,res)=>{
	var connection = mysql.createConnection({
		host : "localhost",
		user : "serverDBManager", //mysql의 id
		password : "0000", //mysql의 password
		database : "dining", //사용할 데이터베이스
		port : 3306
	});
	connection.connect();
	const email = req.query.email;
	connection.query("SELECT * FROM users u, findPeople f WHERE u.email = ? AND u.id = f.writer_id;", [email], function(err,data){
		if(err) throw err;
		else{
			console.log("Get My Party");
			res.send(data);
		}
	});
})

app.get("/ping", (req, res) => {
	res.send("pong");
  console.log("/ping CALLED");
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
	res.set({
			"Cache-Control": "no-cache, no-store, must-revalidate",
			Pragma: "no-cache",
			Date: Date.now()
		  });
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

http.createServer(app).listen(port, () => {
	console.log(`app listening at ${port}`);
});