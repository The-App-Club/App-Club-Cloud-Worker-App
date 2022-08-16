const mysql = require("mysql2");

// https://github.com/planetscale/beta/discussions/127
try {
  const connection = mysql.createConnection({
    user: "HERE_YOUR_KEY",
    password: "HERE_YOUR_KEY",
    database: "HERE_YOUR_KEY",
    host: "HERE_YOUR_KEY",
    ssl: {},
  });
  connection.ping((error) => {
    console.log(error);
  });
  connection.query(`select * from users`, (error, result)=>{
    if(error){
      console.log(error);
    }
    console.log(result)
  })
  if (connection) {
    connection.end((error)=>{
      console.log(error)
    })
  }
} catch (error) {
  console.log(error);
}
